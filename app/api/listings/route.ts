// app/api/listings/route.ts
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Initialize database only if DATABASE_URL is set
const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : null;

export async function GET() {
  if (!sql) {
    return NextResponse.json(
      { error: "Database connection not configured" },
      { status: 500 }
    );
  }
  try {
    const result = await sql("SELECT * FROM listings");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!sql) {
    return NextResponse.json(
      { error: "Database connection not configured" },
      { status: 500 }
    );
  }
  try {
    const { title, description, price } = await request.json();
    const result = await sql(
      "INSERT INTO listings (title, description, price) VALUES ($1, $2, $3) RETURNING *",
      [title, description, price]
    );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add listing" }, { status: 500 });
  }
}