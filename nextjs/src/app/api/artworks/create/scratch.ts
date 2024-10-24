import { clerkClient } from "@clerk/nextjs/server"
import { createClerkClient } from '@clerk/clerk-sdk-node'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../../../../../.env' });
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);


export async function scratch() {
    // Ensure CLERK_SECRET_KEY is set in the environment
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is not set in the environment");
    }

    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    const clientList = await clerkClient.users.getUser("user_2nrpkFoS6GneJzWEQ4PNeV2iNfC")
    return clientList
}

(async () => {
  try {
    const result = await scratch();
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
