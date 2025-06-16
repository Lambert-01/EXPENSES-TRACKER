import { checkTables } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tables = await checkTables();
    return NextResponse.json({ success: true, tables });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
} 