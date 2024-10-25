import { prisma } from '@/lib/db/index'
import { Artwork, User } from '@prisma/client'
import { RotatingBoxesCanvas } from './components/ui/RotatingBoxesCanvas';
import { AnimationState } from '@/types';
import ArtworkFeed from './components/ui/ArtworksFeed'



export default async function Page() {
  const artworks = (await prisma.artwork.findMany({
    include: { author: true }
  })) as (Artwork & { author: User, state: AnimationState })[];

  return (
    <ArtworkFeed artworks={artworks} />
  );
}