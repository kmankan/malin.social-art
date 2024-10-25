import { prisma } from '@/lib/db/index'
import { ArtworkWithAuthor } from '@/types';
import ArtworkFeed from './components/ui/ArtworksFeed'
import { getEnrichedArtworks } from '@/lib/utils/artworks';


export default async function Page() {
  const artworks = await getEnrichedArtworks();
  return <ArtworkFeed artworks={artworks} />;
}