import express, { Request, Response, Router } from 'express';
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} from '../controllers/plantController';
import { authenticateKey } from '../auth.middleware';

const router: Router = express.Router();

router.use(authenticateKey);

// Fetch all plants
router.get('/', async (req: Request, res: Response) => {
  try {
    await getAllPlants(req, res);
  } catch (error) {
    console.error('Error in GET /:', error);
    res.status(500).json({ message: 'Error fetching all plants', error });
  }
});

//Fetch a plant by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getPlantById(req, res);
  } catch (error) {
    console.error('Error in GET /:id:', error);
    res.status(500).json({ message: 'Error fetching plant by ID', error });
  }
});

//Create a new plant
router.post('/', async (req: Request, res: Response) => {
  try {
    await createPlant(req, res);
  } catch (error) {
    console.error('Error in POST /:', error);
    res.status(500).json({ message: 'Error creating plant', error });
  }
});

// Update a plant by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    await updatePlant(req, res);
  } catch (error) {
    console.error('Error in PUT /:id:', error);
    res.status(500).json({ message: 'Error updating plant', error });
  }
});

// Delete a plant by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deletePlant(req, res);
  } catch (error) {
    console.error('Error in DELETE /:id:', error);
    res.status(500).json({ message: 'Error deleting plant', error });
  }
});

export default router;
