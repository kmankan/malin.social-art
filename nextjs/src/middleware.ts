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
    console.log(userId)

  if (userId) {
    const response = (await clerkClient()).users.getUser(userId)
      console.log('it worked!', response)
  }
  

  // try {
  //   // check if user is authenticated
  //   if (userId) {
  //     // Check if clerk_id exists in the database
  //     const clerkUser = await prisma.user.findUnique({
  //       where: { clerk_id: userId }
  //     });
  //     // if it doesn't, add it to the database
  //     if (!clerkUser) {
  //       const newUser = await prisma.user.create({
  //         data: {
  //           clerk_id: userId,
  //           email: ,
  //           name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
  //           username: clerkUser.username || `user_${userId.slice(-8)}`,
  //           // ... any other fields
  //         }

  //       })
  //     }




  //   }
  //   // If user doesn't exist, create them
  //   if (!clerk_id) {
  //     // Get user data from Clerk
  //     const clerkUser = await clerkClient.users.getUser(userId);
      
  //     user = await prisma.user.create({
  //       data: {
  //         clerk_id: userId,
  //         email: clerkUser.emailAddresses[0]?.emailAddress,
  //         name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
  //         username: clerkUser.username || `user_${userId.slice(-8)}`,
  //         // ... any other fields
  //       }
  //     });
  //     }
  
  //     return res.status(200).json(user);
  //   } catch (error) {
  //     console.error("Error syncing user:", error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
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