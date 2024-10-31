import { clerkClient } from '@clerk/nextjs/server';
import { ArtworkWithAuthor } from '@/types';
import { ArtworkBelongingToAuthor } from '@/types';

export async function getEnrichedArtworks(artworks: ArtworkBelongingToAuthor[]) {

  // Get all unique author IDs
  const authorIds = Array.from(new Set(artworks.map(artwork => artwork.authorId)));

  // Get Clerk users
  const clerk = await clerkClient();
  const clerkUsers = await clerk.users.getUserList({
    userId: authorIds,
  });

  // Combine Prisma and Clerk data
  const enrichedArtworks = artworks.map(artwork => {
    const clerkUser = clerkUsers.data.find(user => user.id === artwork.authorId);
    return {
      ...artwork,
      author: {
        ...artwork.author,
        imageUrl: clerkUser?.imageUrl
      }
    };
  });

  return enrichedArtworks as ArtworkWithAuthor[];
}