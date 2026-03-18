# README

## Steps to run the project

### install nextjs

```shell
npx create-next-app@latest . --typescript --biome --tailwind --app --src-dir  --react-compiler --import-alias "@/*" 
```

### auth avec neon

```bash
npm install @neondatabase/serverless @neondatabase/auth@latest
```

- database neon schema

```bash
npm run db:up
```

- fixtures

```bash
npm run db:fixtures
```

- fetch data from neon database avec serverless

- display data in the frontend (2 pages)

- wait 5min
