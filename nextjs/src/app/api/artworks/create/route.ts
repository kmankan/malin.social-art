import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"

// This route handles POST requests to /artworks/create

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { title, description, authorId, state } = await request.json();

    // Validate input
    if (!title || !authorId || !state) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Add the artwork to the database using prisma
    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        authorId, //adds new artwork to the Artwork table and links it with a user in the User table
        state, // need to perform type checking on configuration
        likes: 0, // Initialize likes to 0
      },
    });

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error('Error creating artwork:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

