'use client';
// modules
import React, { useState, useEffect } from 'react';
import { RotatingBoxesCanvas } from './RotatingBoxesCanvas';
import { HeartStraight } from 'phosphor-react'
import Image from 'next/image';
import { UploadedImageCanvas } from './UploadedImageCanvas';
// types
import { ArtworkWithAuthor } from '@/types';

export const ArtworkFeed = ({ artworks: initialArtworks }: { artworks: ArtworkWithAuthor[] }) => {
  // store in state an array of objects structured like ArtworkWithAuthor
  const [artworks, setArtworks] = useState<ArtworkWithAuthor[]>(initialArtworks);
  // store in state all of the artworks the user has already liked
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());

  // when the page loads, get all of the artworks a user has liked and store in state
  useEffect(() => {
    const fetchLikeStatuses = async () => {
      try {
        const response = await fetch('/api/artworks/liked');
        if (response.ok) {
          const likedArtworkIds: string[] = await response.json();
          setLikedArtworks(new Set(likedArtworkIds)); // Valid: string[] -> Set<string>
        }
      } catch (error) {
        console.error('Error fetching like statuses:', error);
      }
    };
    fetchLikeStatuses();
  }, []);

  const handleLike = async (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/artworks/${artworkId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        const updatedArtworkMetadata = await response.json();
        // Update the specific artwork's likes in state
        // map through each artwork until we find the current one, and update that object
        setArtworks(currentArtworks =>
          currentArtworks.map(artwork =>
            artwork.id === artworkId
              ? { ...artwork, likes: updatedArtworkMetadata.likes }
              : artwork
          )
        );

        // Toggle based on current state instead
        // the current state determines whether a heart appears filled or empty
        setLikedArtworks(prev => {
          const newSet = new Set(prev);
          // if the artwork is currently in the set of likes, we remove it, meaning the user is unliking
          if (newSet.has(artworkId)) {
            newSet.delete(artworkId);
            // if the artwork is not in the set, then we add it, meaning the user likes it
          } else {
            newSet.add(artworkId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error liking artwork:', error);
    }
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
              id="eachArtwork"
              className="mb-8 rounded-2xl bg-slate-100 shadow-lg hover:shadow-xl 
              transition-all duration-300 p-6 border-4 border-orange-700"
            >
              {canvas.s3Key && canvas.fileUrl && canvas.fileName ? (
                <UploadedImageCanvas
                  fileUrl={canvas.fileUrl}
                  fileName={canvas.fileName}
                />
              ) : (
                <div className="border-2 aspect-[4/3] w-full">
                  <RotatingBoxesCanvas
                    initialBoxes={canvas.state.boxes}
                    initialBackgroundColor={canvas.state.backgroundColor}
                    initialSelectedBox={canvas.state.selectedBoxId}
                  />
                </div>
              )}
              <div
                className='flex justify-between'
                id="artworkMetadata">
                <div
                  id='user'>
                  {/* If author exists, then render the following */}
                  {canvas.author && (
                    <div className="mt-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden" >
                        <Image
                          src={canvas.author.imageUrl || '/default-avatar.svg'} // Provide a fallback image
                          alt={`${canvas.author?.name || 'User'}'s profile`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
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
                  <div id='numberOfLikesInRealtime'>
                    {artworks.find((artwork) => artwork.id === canvas.id)?.likes}
                  </div>
                  <div
                    id='likeButton'
                    className='ml-1 cursor-pointer transition-colors hover:text-red-500'
                    onClick={async (e) => handleLike(canvas.id, e)}
                  >
                    <HeartStraight
                      size={24}
                      weight={likedArtworks.has(canvas.id) ? 'fill' : 'regular'}
                      className={likedArtworks.has(canvas.id) ? 'text-red-500' : ''}
                    />
                  </div>
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
