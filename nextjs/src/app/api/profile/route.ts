import { NextResponse, NextRequest } from 'next/server';
import { createNewUser } from '@/lib/db/createNewUser';
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// auth() reads these cookies and validates them
// If valid, you get the userId and can proceed with your logic
// If invalid or missing, userId will be null and you can return an error

// A GET request that returns the users profile and artworks
export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { username, email, name, bio } = await request.json();

    if (!username || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newUser = await createNewUser(username, email, name, bio);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating new user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
