import { prisma } from '@/lib/db/index';
import { clerkClient } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get artworks with authors from Prisma
    const artworks = await prisma.artwork.findMany({
      include: { author: true }
    });

    // Get all unique author IDs
    const authorIds = Array.from(new Set(artworks.map(artwork => artwork.authorId)));

    // First get the clerk client
    const clerk = await clerkClient();
    // Then use it to fetch users
    const clerkUsers = await clerk.users.getUserList({
      userId: authorIds,
    });

    // Combine Prisma and Clerk data
    const enrichedArtworks = artworks.map(artwork => {
      const clerkUser = clerkUsers.data.find((user: User) => user.id === artwork.authorId);
      return {
        ...artwork,
        author: {
          ...artwork.author,
          imageUrl: clerkUser?.imageUrl
        }
      };
    });

    return NextResponse.json(enrichedArtworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 });
  }
}
