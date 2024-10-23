import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { corsMiddleware, authMiddleware } from "@/lib/utils/middlewares"

export async function middleware(request: NextRequest) {
  try {
    // Execute them in sequence
    const corsResponse = await corsMiddleware(request)
    if (!corsResponse.ok) return corsResponse
    
    // const authResponse = await authMiddleware(request)
    // if (!authResponse.ok) return authResponse
    
    return NextResponse.next()
    
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// This configures which routes the middleware runs on
export const config = {
  matcher: '/api/:path*',
}