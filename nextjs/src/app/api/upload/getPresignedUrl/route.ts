import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(request: Request) {
  const { filename } = await request.json();
  
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  });

  // Create command for the future PUT operation
  const command = new PutObjectCommand({
    Bucket: 'your-bucket-name',
    Key: filename,
    ContentType: 'image/jpeg' // Or determine dynamically
  });

  // Generate presigned URL (valid for 1 hour)
  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600
  });

  return Response.json({ presignedUrl });
}