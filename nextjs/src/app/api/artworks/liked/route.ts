import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/index'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const favourites = await prisma.favourite.findMany({
      where: { userId },
      select: { artworkId: true }
    })
    console.log('returned these favourites:', favourites)
    // maps to a string[] type
    return NextResponse.json(favourites.map(fav => fav.artworkId))
  } catch (error) {
    console.error('Error fetching liked artworks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch liked artworks' },
      { status: 500 }
    )
  }
}