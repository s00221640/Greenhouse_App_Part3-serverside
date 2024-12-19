import express, { Request, Response, Router } from 'express';
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} from '../controllers/plantController';

const router: Router = express.Router();

// Fetch all plants
router.get('/', async (req: Request, res: Response) => {
  console.log('GET / - Fetching all plants');
  try {
    await getAllPlants(req, res);
  } catch (error) {
    console.error('Error in GET /:', error);
    res.status(500).json({ message: 'Error fetching all plants', error });
  }
});

// Fetch a plant by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`GET /:id - Fetching plant by ID: ${id}`);
  try {
    await getPlantById(req, res);
  } catch (error) {
    console.error(`Error in GET /:id (${id}):`, error);
    res.status(500).json({ message: 'Error fetching plant by ID', error });
  }
});

// Create a new plant
router.post('/', async (req: Request, res: Response) => {
  console.log('POST / - Creating a new plant', req.body);
  try {
    await createPlant(req, res);
  } catch (error) {
    console.error('Error in POST /:', error);
    res.status(500).json({ message: 'Error creating plant', error });
  }
});

// Update a plant by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`PUT /:id - Updating plant with ID: ${id}`, req.body);
  try {
    await updatePlant(req, res);
  } catch (error) {
    console.error(`Error in PUT /:id (${id}):`, error);
    res.status(500).json({ message: 'Error updating plant', error });
  }
});

// Delete a plant by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`DELETE /:id - Deleting plant with ID: ${id}`);
  try {
    await deletePlant(req, res);
  } catch (error) {
    console.error(`Error in DELETE /:id (${id}):`, error);
    res.status(500).json({ message: 'Error deleting plant', error });
  }
});

export default router;
