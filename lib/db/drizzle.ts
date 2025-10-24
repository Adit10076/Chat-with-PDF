import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  console.warn('⚠️  POSTGRES_URL not set. Database features disabled. Set up database credentials to enable full functionality.');
}

export const client = process.env.POSTGRES_URL ? postgres(process.env.POSTGRES_URL) : null as any;
export const db = process.env.POSTGRES_URL ? drizzle(client, { schema }) : null as any;
