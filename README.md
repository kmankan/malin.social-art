# Art & Friends - Social Art Platform

A dynamic social platform for creating, sharing, and discovering 3D art and digital artwork.

## ✨ Features

- **3D Art Creation**: Interactive 3D art creation tool with customizable rotating boxes
- **Image Upload**: Share your favorite artworks (up to 10MB)
- **Social Timeline**: View and interact with artwork from the community
- **Like System**: Like and save your favorite pieces
- **User Profiles**: Personalized profiles with artwork collections
- **Authentication**: Secure user authentication via Clerk

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, Three.js, React Three Fiber
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Storage**: AWS S3
- **Styling**: Tailwind CSS
- **TypeScript**: For type safety

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm/yarn/pnpm
- PostgreSQL database
- AWS S3 bucket
- Clerk account

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/art-and-friends.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
# Create a .env file with the following variables
POSTGRES_PRISMA_URL="your-postgres-url"
POSTGRES_URL_NON_POOLING="your-postgres-non-pooling-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="your-aws-region"
AWS_BUCKET_NAME="your-s3-bucket-name"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## 🌟 Usage

### Creating 3D Art

1. Navigate to the "create" page
2. Use the interactive controls to:
   - Add new boxes
   - Change colors
   - Adjust rotation speed
   - Modify rotation axis
3. Save your creation

### Uploading Artwork

1. Go to the "upload" page
2. Select an image file (max 10MB)
3. Wait for upload confirmation

### Interacting with Art

- Like artwork by clicking the heart icon
- View your liked artwork in your profile
- Browse the community timeline

## 📁 Project Structure

```bash
art-and-friends/
├── src/
│   ├── app/
│   │   ├── api/                # API Routes
│   │   ├── components/         # All React components
│   │   ├── create/            # Create artwork page
│   │   ├── profile/           # User profile page
│   │   ├── upload/            # Upload page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── lib/                   # Utilities and helpers
│   └── types/                 # TypeScript types
├── prisma/                    # Database configuration
├── public/                    # Static assets
├── middleware.ts              # Next.js middleware
├── .env                       # Environment variables
└── package.json
```

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [Clerk](https://clerk.dev/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🔗 Links

- [Project Repository](https://github.com/kmankan/malin.social-art)
- [Live Demo](https://art.mahlen.xyz/)
