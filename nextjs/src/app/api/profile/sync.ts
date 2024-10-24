// pages/api/user/sync.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { clerk_id: userId }
    });

    // If user doesn't exist, create them
    if (!user) {
      // Get user data from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      
      user = await prisma.user.create({
        data: {
          clerk_id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
          username: clerkUser.username || `user_${userId.slice(-8)}`,
          // ... any other fields
        }
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}