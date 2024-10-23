import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: `testuser_${Date.now()}`,
        email: `testuser@example.com`,
        name: 'Test User',
        bio: 'This is a test user account',
      },
    });

    console.log('Test user created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser()
export default createTestUser;
