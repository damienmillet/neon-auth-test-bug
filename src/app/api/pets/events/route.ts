import { Client, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { getDatabaseUrl } from "@/lib/db";
import { PET_EVENTS_CHANNEL, type PetEvent } from "@/lib/pet-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

neonConfig.webSocketConstructor = ws;

const encoder = new TextEncoder();

function formatSseMessage(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function GET(request: Request) {
  const client = new Client({ connectionString: getDatabaseUrl() });
  await client.connect();
  await client.query(`LISTEN ${PET_EVENTS_CHANNEL}`);

  let heartbeatId: ReturnType<typeof setInterval> | undefined;
  let closed = false;

  const close = async (
    controller?: ReadableStreamDefaultController<Uint8Array>,
  ) => {
    if (closed) {
      return;
    }

    closed = true;

    if (heartbeatId) {
      clearInterval(heartbeatId);
    }

    client.removeAllListeners();

    try {
      await client.query(`UNLISTEN ${PET_EVENTS_CHANNEL}`);
    } catch {
      // Ignore cleanup failures when connection is already closing.
    }

    await client.end().catch(() => undefined);
    controller?.close();
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        formatSseMessage("connected", {
          ok: true,
          connectedAt: new Date().toISOString(),
        }),
      );

      client.on("notification", (message) => {
        if (!message.payload) {
          return;
        }

        const payload = JSON.parse(message.payload) as PetEvent;
        controller.enqueue(formatSseMessage("pet", payload));
      });

      client.on("error", () => {
        void close(controller);
      });

      heartbeatId = setInterval(() => {
        controller.enqueue(
          formatSseMessage("heartbeat", {
            at: new Date().toISOString(),
          }),
        );
      }, 15000);

      request.signal.addEventListener("abort", () => {
        void close(controller);
      });
    },
    cancel() {
      void close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
