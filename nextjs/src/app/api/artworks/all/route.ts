import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"

// This handles GET requests to /api/artworks/all
export async function GET(request: Request) {
  try {
    const artworks = await prisma.artwork.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        configuration: true,
        likes: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (artworks.length === 0) {
      return NextResponse.json({ error: 'No artworks found' }, { status: 404});
    }

    return NextResponse.json(artworks, { status: 200 });

  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}