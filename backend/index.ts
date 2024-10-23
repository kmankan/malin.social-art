import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// GET request example
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST request to create a new artwork
app.post('/api/create/artworks', async (req, res) => {
  try {
    // store all the recieved information about the artwork
    const { title, description, authorId, configuration } = req.body;
    // Validate input
    if (!title || !authorId || !configuration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Add the artwork to the database using prisma
    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        authorId, //adds new artwork to the Artwork table and links it with a user in the User table
        configuration, // need to perform type checking on configuration
        likes: 0, // Initialize likes to 0
      },
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET request to fetch all artworks for the social feed
app.get('/api/artworks/all', async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        configuration: true,
        likes: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // GET request to fetch a specific artwork by ID
    app.get('/api/artworks/:id', async (req, res) => {
      try {
        const { id } = req.params;

        const artwork = await prisma.artwork.findUnique({
          where: { id },
          select: {
            id: true,
            title: true,
            description: true,
            configuration: true,
            likes: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        });

        if (!artwork) {
          return res.status(404).json({ error: 'Artwork not found' });
        }

        res.json(artwork);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    
    res.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request to add a like to an artwork
app.post('/api/artworks/:id/like', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the artwork and increment its likes
    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      },
      select: {
        id: true,
        likes: true
      }
    });

    if (!updatedArtwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(updatedArtwork);
  } catch (error) {
    console.error('Error adding like to artwork:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
