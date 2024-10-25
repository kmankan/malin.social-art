import ArtworkFeed from './components/ui/ArtworksFeed'
import { getEnrichedArtworks } from '@/lib/utils/artworks';


export default async function Page() {
  const artworks = await getEnrichedArtworks();
  console.log(artworks)
  return <ArtworkFeed artworks={artworks} />;
}