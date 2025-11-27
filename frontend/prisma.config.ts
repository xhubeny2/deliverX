import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    seed: 'tsx src/seed/seed.ts',
  },
  datasource: {
    url: env('POSTGRES_PRISMA_URL'),
  },
});
