'use client'
import Image from 'next/image';
import { useState } from 'react';

interface UploadedImageCanvasProps {
  fileUrl: string;
  fileName: string;
}

export function UploadedImageCanvas({ fileUrl, fileName }: UploadedImageCanvasProps) {
  // Add loading state to handle hydration
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='uploaded-image border-2 h-full relative aspect-[4/3]'>
      <Image
        src={fileUrl}
        alt={fileName}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        onLoad={() => setIsLoading(false)}
        priority={true}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          Loading...
        </div>
      )}
    </div>
  );
}