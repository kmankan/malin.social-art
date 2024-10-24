import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { corsMiddleware, authMiddleware } from "@/lib/utils/middlewares"
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// define protected routes - restrict these routes to signed in users only
const isProtectedRoute = createRouteMatcher(['/create(.*)', '/profile(.*)'])


// We use clerkMiddleware as the default export, passing it an async function.
export default clerkMiddleware(async (auth, request: NextRequest) => {
  try {
    
    if (isProtectedRoute(request)) await auth.protect()
  
    return NextResponse.next()
    
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }

})

// This configures which routes the middleware runs on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}