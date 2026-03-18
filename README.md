# README

## Steps to run the project

### install nextjs

```shell
npx create-next-app@latest . --typescript --biome --tailwind --app --src-dir  --react-compiler --import-alias "@/*" 
```

### auth avec neon

```bash
npm install @neondatabase/serverless @neondatabase/auth
touch src/proxy.ts
touch src/app/api/auth/[...neon].ts
touch src/app/api/auth/[...neon].ts
```

- database neon schema

- fetch data from neon database avec serverless

- display data in the frontend (2 pages)

- wait 5min
