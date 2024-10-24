import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { syncUserWithDatabase } from './app/api/ sync-user/sync'

// define protected routes - restrict these routes to signed in users only
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// We use clerkMiddleware as the default export, passing it an async function.
export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // get the clerk_id from the auth() function
  const { userId } = await auth()

  if (userId) {
    // Call the API route instead of directly calling the function
    fetch('/api/sync-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).catch(error => console.error('Error syncing user:', error));
    // We use .catch() here to handle any network errors, but we don't await the response
    // to avoid blocking the middleware
  }

  // next() method creates a response object allowing requests to continue to the next middleware 
  // i.e. continue processing the next middleware normally after this
  return NextResponse.next();
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
