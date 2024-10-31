import { prisma } from '@/lib/db/index'
import { ArtworkWithAuthor } from '@/types/index';
import ArtworkFeed from '../components/ui/ArtworksFeed'
import { currentUser } from '@clerk/nextjs/server'
import { getEnrichedArtworks } from '@/lib/utils/artworks';

export default async function Page() {

  const user = await currentUser();

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  const userAndFavouritesArtwork = await prisma.artwork.findMany({
    where: {
      OR: [
        { authorId: user.id },
        {
          favourite: {
            some: {
              userId: user.id
            }
          }
        }
      ]
    },
    include: {
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) as ArtworkWithAuthor[];

  const userArtworksAndFavouritesEnriched = await getEnrichedArtworks(userAndFavouritesArtwork);

  return (
    <div className="w-full">
      {userAndFavouritesArtwork.length === 0 ? (
        <div>No artworks found</div>
      ) : (
        <ArtworkFeed artworks={userArtworksAndFavouritesEnriched} />
      )}
    </div>
  );
}