import { Prisma, Artwork } from '@prisma/client'

export type CreateArtworkData = {
  title: string;
  description?: string;
  authorId: string;
  state: AnimationState; // Replace 'any' with a more specific type if possible
}

export type BoxConfig = {
  id: string;
  color: string;  // Can be hex (#00ff00) or hsl format
  speed: number;
  size: number;
  rotationAxis: 'x' | 'y';
  position: [number, number, number];  // 3D position array
  isSelected: boolean;
}

// Types for saving animation state
export type AnimationState = {
  backgroundColor: string;  // Hex color format
  boxes: BoxConfig[];
  selectedBoxId: string;  // Always matches one of the box IDs
}

export type RotatingBoxesCanvasProps = {
  initialBoxes: BoxConfig[];
  initialSelectedBox?: string;
  initialBackgroundColor?: string;
}

export type BoxesCanvas = {
  state: AnimationState;
}

export type ArtworkWithAuthor = {
  id: string;
  title: string | null;
  description: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  state: AnimationState;
  s3Key: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileName: string | null;
  author: {
    id: string;
    clerk_id: string;
    username: string | null;
    email: string;
    name: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;  // Clerk-specific field
  };
}


// Different includes give different types
// You can use this pattern to see exactly what type Prisma is inferring from your schema
export type ArtworkBelongingToAuthor = Prisma.ArtworkGetPayload<{ include: { author: true } }>
export type ArtworkWithFavorites = Prisma.ArtworkGetPayload<{ include: { favourite: true } }>
export type ArtworkWithAuthorAndFavoritesAndUsers = Prisma.ArtworkGetPayload<{
  select: {
    id: true,
    title: true,
    description: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
    likes: true,
    state: true,
    author: true,
    favourite: {
      include: {
        user: true
      }
    }
  }
}>

// Request types
export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
}

// Response types
export interface PresignedUrlResponse {
  presignedUploadUrl: string;
  key: string;
}

// Optional: If you need to type the upload response
export interface UploadResponse {
  success: boolean;
  error?: string;
}

// Optional: If you need to type the full upload result
export interface FileUploadResult {
  S3key: string;
  clerk_id: string;
  fileName: string;
  fileType: string;
}

export interface UploadCompleteResponse {
  success: boolean;
  artwork: Artwork;
}