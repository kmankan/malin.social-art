// /api/upload/complete
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/index';  // Assuming you're using Prisma or similar

export async function POST(request: Request) {
  try {
    const { fileName, fileType, S3key, clerk_id } = await request.json();

    if (!fileName || !S3key || !clerk_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new artwork with file details
    const artwork = await prisma.artwork.create({
      data: {
        fileName,
        fileType,
        s3Key: S3key,
        fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${S3key}`,
        authorId: clerk_id,
        likes: 0,
        state: {}, // Initialize with empty state
        title: fileName
      },
    });

    console.log(`Successfully created artwork: ${artwork.id} for user: ${clerk_id}`);
    console.log(`File details - Name: ${fileName}, Type: ${fileType}, S3 Key: ${S3key}`);

    return NextResponse.json({
      success: true,
      artwork,
    });

  } catch (error) {
    console.error('Error in upload complete:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}

