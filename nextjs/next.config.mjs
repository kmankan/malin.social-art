/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'social-art-uploads.s3.ap-southeast-2.amazonaws.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig;