import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// GET request example
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST request example
app.post('/api/resource', (req, res) => {
  // Handle POST request
  res.status(201).json({ message: 'Resource created' });
});

// PUT request example
app.put('/api/resource/:id', (req, res) => {
  const { id } = req.params;
  // Handle PUT request
  res.json({ message: `Resource ${id} updated` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
