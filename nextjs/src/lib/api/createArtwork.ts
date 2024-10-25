//import types
import {CreateArtworkData } from '@/types/index';
import { Artwork } from "@prisma/client"

// this function will accept state
export async function createArtwork(data: CreateArtworkData): Promise<Artwork | null> {
  try {
    const response = await fetch("/api/artworks/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdArtwork: Artwork = await response.json();
    return createdArtwork;
  } catch (error) {
    console.error("Error creating artwork:", error);
    return null;
  }
}
