import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/index'
import { auth } from '@clerk/nextjs/server'

export async function POST(
  request: Request,
  // the value captured from the URL of this dynamic segment is passed to your route handler in the params object
  // The type definition { params: { id: string } } tells TypeScript that params will have an id property of type string
  // e.g. /api/artworks/123/like => params.id === "123"
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  const artworkId = params.id

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
     // Check if user already liked this artwork
    const existingFavorite = await prisma.favourite.findUnique({
      where: {
        artworkId_userId: { // Match the schema's @@unique constraint -> this is called a compound unique identifier
          userId,
          artworkId
        }
      }
    })

    if (existingFavorite) {
      // Unlike: Remove favorite and decrement likes
      const [, updatedArtwork] = await prisma.$transaction([
        prisma.favourite.delete({
          where: {
            id: existingFavorite.id // Use the id field from schema
          }
        }),
        prisma.artwork.update({
          where: { id: artworkId },
          data: {
            likes: { decrement: 1 }
          }
        })
      ])

      return NextResponse.json({ 
        success: true, 
        likes: updatedArtwork.likes,
        liked: false
      })
    }

    // Like: Create favorite and increment likes
    const [favourite, updatedArtwork] = await prisma.$transaction([
      prisma.favourite.create({
        data: {
          userId,
          artworkId
        }
      }),
      prisma.artwork.update({
        where: { id: artworkId },
        data: {
          likes: { increment: 1 }
        }
      })
    ])
    
    return NextResponse.json({ 
      success: true, 
      likes: updatedArtwork.likes, 
      liked: true,
      favourite // Include favourite data if needed
    })
  } catch (error) {
    console.error('Error incrementing likes:', error)
    return NextResponse.json(
      { error: 'Failed to like artwork' },
      { status: 500 }
    )
  }
}