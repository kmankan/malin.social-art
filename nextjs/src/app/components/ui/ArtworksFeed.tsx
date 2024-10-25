import React from 'react';
import { RotatingBoxesCanvas } from './RotatingBoxesCanvas';

export const ArtworkFeed = ({ artworks }) => {
  return (
    <div className="flex min-h-screen bg-rose-50">
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {artworks.map((canvas, index) => (
            <div
              key={canvas.id || index}
              className="mb-8 rounded-lg overflow-hidden bg-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 border-2 border-orange-700">
                <div className="aspect-auto w-full">
                  <RotatingBoxesCanvas
                    initialBoxes={canvas.state.boxes}
                    initialBackgroundColor={canvas.state.backgroundColor}
                    initialSelectedBox={canvas.state.selectedBoxId}
                  />
                </div>

                {/* Optional: Author information */}
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtworkFeed;