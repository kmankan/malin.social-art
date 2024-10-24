import { prisma } from "@/lib/db"; 
import { clerkClient } from "@clerk/nextjs/server";

export const syncUserWithDatabase = async (userId: string) => {
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
    console.log("user already in database")
  }
}