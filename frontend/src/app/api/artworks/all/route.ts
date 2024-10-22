// app/api/users/route.ts
import { NextResponse } from 'next/server'

// Example in-memory database (replace with real DB in production)
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]

export async function GET() {
  return NextResponse.json(users)
}