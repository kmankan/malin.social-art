// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server'

// Example in-memory database (replace with real DB in production)
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === parseInt(params.id))
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  return NextResponse.json(user)
}
