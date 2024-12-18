import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import plantRoutes from './routes/plantRoutes';

dotenv.config();  //.env file

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse JSON
app.use(express.json());

//Routes 
app.use('/plants', plantRoutes);

//Database connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Greenhouse App!');
});

//startig the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
