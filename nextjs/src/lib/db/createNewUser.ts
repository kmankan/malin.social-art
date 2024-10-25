import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createNewUser(
  username: string, 
  email: string, 
  name: string, 
  bio: string,
  clerk_id: string  // Add this parameter
) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        name,
        bio,
        clerk_id,  // Add this field
      },
    });

    console.log('New user created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { createNewUser };
