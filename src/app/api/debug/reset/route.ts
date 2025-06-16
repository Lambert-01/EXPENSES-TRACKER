import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Drop all tables
    await db.execute(`
      DROP TABLE IF EXISTS "savings" CASCADE;
      DROP TABLE IF EXISTS "budgets" CASCADE;
      DROP TABLE IF EXISTS "transactions" CASCADE;
      DROP TABLE IF EXISTS "categories" CASCADE;
      DROP TABLE IF EXISTS "verificationToken" CASCADE;
      DROP TABLE IF EXISTS "session" CASCADE;
      DROP TABLE IF EXISTS "account" CASCADE;
      DROP TABLE IF EXISTS "user" CASCADE;
    `);

    return NextResponse.json({ success: true, message: 'Tables dropped successfully' });
  } catch (error) {
    console.error('Reset route error:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
} 