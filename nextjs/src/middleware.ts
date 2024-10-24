import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { checkIfUserInDatabase } from './app/api/profile/sync'


// define protected routes - restrict these routes to signed in users only
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])


// We use clerkMiddleware as the default export, passing it an async function.
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // get the clerk_id from the auth() function
  const { userId } = await auth()

  if (userId) {
    // pass to a function that handles the check
    checkIfUserInDatabase(userId);
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