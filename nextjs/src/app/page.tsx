import { prisma } from '@/lib/db/index'
import { Artwork, User } from '@prisma/client'
import { RotatingBoxesCanvas } from './components/ui/RotatingBoxesCanvas';
import { AnimationState } from '@/types';

export default async function Page() {
  const artworks = (await prisma.artwork.findMany({ // returns an array of artwork objects
    include: { author: true }  // This will include the author details for each artwork
  })) as (Artwork & { author: User, state: AnimationState })[];

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <main className="flex-grow p-8border-2">
        <div className="feed p-6 rounded-lg shadow-lg flex justify-center items-start min-h-screen w-2/3 mx-auto">
          <div className="artwork flex justify-center items-center bg-white p-12 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-6xl min-h-[400px]">
            {artworks.map((canvas, index) => {
              return (
                <RotatingBoxesCanvas initialBoxes={canvas.state.boxes} initialBackgroundColor={canvas.state.backgroundColor} initialSelectedBox={canvas.state.selectedBoxId} />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
