import express, { Request, Response, Router } from 'express';
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
  deleteAllPlants
} from '../controllers/plantController';
import { authenticateKey } from '../auth.middleware';
import Plant from '../models/plantModel'; // Added import for Plant model

const router: Router = express.Router();

router.use(authenticateKey);

// Debug/special routes first
// Emergency reset route - REMOVE IN PRODUCTION
router.delete('/reset', async (req: Request, res: Response) => {
  try {
    // Delete all plants
    const result = await Plant.deleteMany({});
    console.log(`Deleted all ${result.deletedCount} plants`);
    
    res.status(200).json({ 
      message: `Deleted all ${result.deletedCount} plants` 
    });
  } catch (error) {
    console.error('Error resetting plants:', error);
    res.status(500).json({ message: 'Error resetting plants', error });
  }
});

// Debug route to delete all plants - REMOVE IN PRODUCTION
router.delete('/all/debug', async (req: Request, res: Response) => {
  try {
    await deleteAllPlants(req, res);
  } catch (error) {
    console.error('Error in DELETE /all/debug:', error);
    res.status(500).json({ message: 'Error deleting all plants', error });
  }
});

// Fix plants route for adding userId to plants without one
router.post('/fix-plants', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    console.log('Fixing plants for user ID:', userId);
    
    // Find plants without userId
    const plantsWithoutUserId = await Plant.find({ userId: { $exists: false } });
    console.log(`Found ${plantsWithoutUserId.length} plants without userId`);
    
    // Fix each plant by adding the current user's ID
    const updatePromises = plantsWithoutUserId.map(plant => 
      Plant.findByIdAndUpdate(plant._id, { userId: userId }, { new: true })
    );
    
    const updatedPlants = await Promise.all(updatePromises);
    console.log(`Updated ${updatedPlants.length} plants with userId: ${userId}`);
    
    res.status(200).json({ 
      message: `Fixed ${updatedPlants.length} plants`, 
      plants: updatedPlants
    });
  } catch (error) {
    console.error('Error fixing plants:', error);
    res.status(500).json({ message: 'Error fixing plants', error });
  }
});

// Standard CRUD routes
// Fetch all plants
router.get('/', async (req: Request, res: Response) => {
  try {
    await getAllPlants(req, res);
  } catch (error) {
    console.error('Error in GET /:', error);
    res.status(500).json({ message: 'Error fetching all plants', error });
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

//Fetch a plant by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    await getPlantById(req, res);
  } catch (error) {
    console.error('Error in GET /:id:', error);
    res.status(500).json({ message: 'Error fetching plant by ID', error });
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