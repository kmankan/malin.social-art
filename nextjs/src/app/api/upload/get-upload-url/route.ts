import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PresignedUrlRequest, PresignedUrlResponse } from '@/types/index';

export async function POST(request: Request) {
  const { fileName, fileType }: PresignedUrlRequest = await request.json();
  
  const key = `uploads/${Date.now()}-${fileName}`;

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  });

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType
  });

  const presignedUploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600
  });

  return Response.json({
    presignedUploadUrl,
    key
  } as PresignedUrlResponse);
}

