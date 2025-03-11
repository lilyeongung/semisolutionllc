import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : null;

export async function GET() {
  if (!sql) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  try {
    const result = await sql("SELECT * FROM listings");
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("GET Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error) || "Failed to fetch listings";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!sql) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  try {
    const { title, price, description } = await request.json();
    const result = await sql(
      "INSERT INTO listings (title, price, description) VALUES ($1, $2, $3) RETURNING *",
      [title, price, description]
    );
    return NextResponse.json(result[0]);
  } catch (error: unknown) {
    console.error("POST Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error) || "Failed to add listing";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}