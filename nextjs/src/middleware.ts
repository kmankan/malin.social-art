import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth, clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db/index'

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
    const client = await clerkClient();
    console.log(client)
    const user = await client.users?.getUser(userId);
    
    // check if the clerk_id exits in the database
    const clerkUser = await prisma.user.findUnique({
      where: { clerk_id: userId }
    });
    // if they don't add them to the database
    if (!clerkUser) {
      await prisma.user.create({
        data: {
          clerk_id: userId,
          email: user.emailAddresses[0].emailAddress,
          name: user.firstName,
          username: user.username
        }
      });
      console.log(userId, "added to database")
    } else {
      console.log("user in database")
    }
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
