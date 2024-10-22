import { NextResponse } from 'next/server'
import { prisma } from "@/lib/db"

// This handles GET requests to /api/artworks/all/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const artwork = await prisma.artwork.findUnique({
      where: { id },
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
    });

    if (!artwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    return NextResponse.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
