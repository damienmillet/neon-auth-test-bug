# README

## Steps to run the project

### install nextjs

```shell
npx create-next-app@latest . --typescript --biome --tailwind --app --src-dir  --react-compiler --import-alias "@/*" 
```

### auth avec neon

```shell
npm install @neondatabase/serverless @neondatabase/auth@latest
```

### database neon schema

#### init database

```shell
npm run db:reset:fixtures
```

#### update schema

```shell
npm run db:up
npm run db:fixtures
npm run db:doc:schema # to update the schema documentation
```

### fetch data from neon database avec serverless

We created 2 pages, dogs and cats, to display data from the database.

### wait 5min

navigate from cats to dogs, and you shouldn't see the data from the database.
