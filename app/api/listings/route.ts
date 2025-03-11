// app/api/listings/route.ts

// Connects to Neon
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Initialize database connection
const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_ZFgiPpwVt0j1@ep-fancy-fog-a6cd82fw-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require");

// GET request to fetch all listings from the database
// Returns a JSON response with the listings data
export async function GET() {
  const result = await sql("SELECT * FROM listings");
  return NextResponse.json(result);
}

// POST request to create a new listing in the database
// Returns a JSON response with the new listing data
export async function POST(request: Request) {
  const { title, price } = await request.json();
  const result = await sql(
    "INSERT INTO listings (title, price) VALUES ($1, $2) RETURNING *",
    [title, price]
  );
  return NextResponse.json(result[0]);
}