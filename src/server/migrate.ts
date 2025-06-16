import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log('Running migrations...');
  
  try {
    // Create enums if they don't exist
    await sql`DO $$ BEGIN
      CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE');
      EXCEPTION WHEN duplicate_object THEN null;
    END $$;`;

    await sql`DO $$ BEGIN
      CREATE TYPE category_type AS ENUM (
        'FOOD',
        'TRANSPORT',
        'ENTERTAINMENT',
        'BILLS',
        'SHOPPING',
        'HEALTH',
        'EDUCATION',
        'OTHER'
      );
      EXCEPTION WHEN duplicate_object THEN null;
    END $$;`;

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        "emailVerified" TIMESTAMP,
        image TEXT
      )
    `;

    // Create account table
    await sql`
      CREATE TABLE IF NOT EXISTS account (
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, "providerAccountId")
      )
    `;

    // Create session table
    await sql`
      CREATE TABLE IF NOT EXISTS session (
        "sessionToken" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL
      )
    `;

    // Create verificationToken table
    await sql`
      CREATE TABLE IF NOT EXISTS "verificationToken" (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires TIMESTAMP NOT NULL,
        PRIMARY KEY (identifier, token)
      )
    `;

    // Create category table
    await sql`
      CREATE TABLE IF NOT EXISTS category (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create transaction table
    await sql`
      CREATE TABLE IF NOT EXISTS transaction (
        id SERIAL PRIMARY KEY,
        amount INTEGER NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        category_id INTEGER REFERENCES category(id),
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create budget table
    await sql`
      CREATE TABLE IF NOT EXISTS budget (
        id SERIAL PRIMARY KEY,
        amount INTEGER NOT NULL,
        category_id INTEGER NOT NULL REFERENCES category(id),
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create savings table
    await sql`
      CREATE TABLE IF NOT EXISTS savings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        target_amount INTEGER NOT NULL,
        current_amount INTEGER NOT NULL DEFAULT 0,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        deadline TIMESTAMP,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 