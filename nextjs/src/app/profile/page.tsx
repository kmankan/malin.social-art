import { prisma } from '@/lib/db/index'
import { Artwork, User } from '@prisma/client'
import { AnimationState } from '@/types';
import ArtworkFeed from '../components/ui/ArtworksFeed'
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  const artworks = (await prisma.artwork.findMany({
    where: {
      authorId: user.id
    },
    include: { author: true }
  })) as (Artwork & { author: User, state: AnimationState })[];

  // Server-side log (will appear in terminal)
  console.log('Server-side artworks:', artworks);

  return (
    <div className="w-full">
      {artworks.length === 0 ? (
        <div>No artworks found</div>
      ) : (
        <>
          <ArtworkFeed artworks={artworks} />
          <div>Found {artworks.length} artwork(s)</div>
        </>
      )}
    </div>
  );
}