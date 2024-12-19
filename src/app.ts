import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import plantRoutes from './routes/plantRoutes';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Debug Incoming Requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Test CORS route
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Routes
app.use('/plants', plantRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Greenhouse App!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
