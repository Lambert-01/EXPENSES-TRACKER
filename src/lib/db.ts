import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../server/schema";

// Function to get database URL with better error handling
function getDatabaseURL() {
  const url = process.env.DATABASE_URL;
  if (!url || url.length === 0) {
    // In development, provide more helpful error message
    if (process.env.NODE_ENV === 'development') {
      console.error('DATABASE_URL is not set. Please check your .env file and ensure it contains:');
      console.error('DATABASE_URL=your_neon_database_url');
      console.error('If you have set it, try restarting your Next.js development server.');
    }
    return 'postgresql://neondb_owner:npg_dntjBg6LuM3W@ep-rapid-frog-a8smp4wk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';
  }
  return url;
}

// Create neon connection with error handling
let sql: NeonQueryFunction<false, false>;
try {
  sql = neon(getDatabaseURL());
} catch (error) {
  console.error('Failed to create database connection:', error);
  // Provide a fallback that won't break the app immediately
  sql = neon(getDatabaseURL());
}

// Create drizzle database instance with explicit schema
export const db = drizzle(sql, {
  schema: {
    ...schema,
    // Explicitly define schema tables to avoid undefined issues
    transactions: schema.transactions,
    categories: schema.categories,
    budgets: schema.budgets,
    savings: schema.savings,
    users: schema.users,
    account: schema.account,
    sessions: schema.sessions,
    verificationTokens: schema.verificationTokens,
  }
});

// Debug function to check tables
export async function checkTables() {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables);
    return tables;
  } catch (error) {
    console.error('Failed to check tables:', error);
    return [];
  }
}

// Export types
export type Transaction = typeof schema.transactions.$inferSelect;
export type NewTransaction = typeof schema.transactions.$inferInsert; 