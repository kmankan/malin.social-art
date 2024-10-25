import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/index'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  request: Request,
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
    const favourite = await prisma.favourite.findUnique({
      where: {
        artworkId_userId: {
          userId,
          artworkId
        }
      }
    })

    return NextResponse.json({ hasLiked: !!favourite })
  } catch (error) {
    console.error('Error checking like status:', error)
    return NextResponse.json(
      { error: 'Failed to check like status' },
      { status: 500 }
    )
  }
}