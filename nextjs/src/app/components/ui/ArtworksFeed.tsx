'use client';
// modules
import React from 'react';
import { RotatingBoxesCanvas } from './RotatingBoxesCanvas';
import { Heart } from 'lucide-react';

//types
import { ArtworkMetadata } from '@/types';

export const ArtworkFeed = ({ artworks }: { artworks: ArtworkMetadata }) => {
  const handleArtworkClick = (artworkId: string | number) => {
    // You can add your desired action here
    console.log('Artwork clicked:', artworkId);
  };

  return (
    <div className="flex min-h-screen bg-rose-50">
      <main className="flex w-screen">
        <div
          id="feed"
          className="w-full max-w-screen-sm p-8 mx-auto">
          {artworks.map((canvas, index) => (
            <div
              key={canvas.id || index}
              onClick={() => handleArtworkClick(canvas.id)}
              id="eachArtwork"
              className="mb-8 rounded-2xl bg-slate-100 shadow-lg hover:shadow-xl 
              transition-all duration-300 p-6 border-4 border-orange-700 flex flex-col 
              justify-between cursor-pointer active:bg-slate-200"
            >
              <div className="border-2 border-green-500 aspect-[4/3] w-full">
                <RotatingBoxesCanvas
                  initialBoxes={canvas.state.boxes}
                  initialBackgroundColor={canvas.state.backgroundColor}
                  initialSelectedBox={canvas.state.selectedBoxId}
                />
              </div>
              <div
                className='flex justify-between'
                id="artworkMetadata">
                <div
                  id='user'>
                  {/* If author exists, then render the following */}
                  {canvas.author && (
                    <div className="mt-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {canvas.author.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className='flex items-center mt-4'
                  id='likes'>
                  {canvas.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtworkFeed;
