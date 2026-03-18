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

### database neon schema

```bash
npm run db:up
npm run db:fixtures
npm run db:doc:schema # to update the schema documentation
```

- fetch data from neon database avec serverless

- display data in the frontend (2 pages)

- wait 5min
