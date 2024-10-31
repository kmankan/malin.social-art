import ArtworkFeed from '../components/ui/ArtworksFeed'
import { getEnrichedArtworks } from '@/lib/utils/artworks';
import { prisma } from '@/lib/db/index';
import { ArtworkBelongingToAuthor } from '@/types';


export default async function Page() {
  // Get all artworks with author metadata from Prisma
  const allArtworks: ArtworkBelongingToAuthor[] = await prisma.artwork.findMany({
    include: { author: true }
  });
  // Enrich this Artwork metadata with Clerk avatar images
  const allArtworksEnriched = await getEnrichedArtworks(allArtworks);
  // Pass that into the Feed Generator component
  return <ArtworkFeed artworks={allArtworksEnriched} />;
}