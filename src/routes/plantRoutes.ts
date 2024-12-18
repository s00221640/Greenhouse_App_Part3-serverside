import express, { Request, Response, Router } from 'express';
import {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} from '../controllers/plantController';

const router: Router = express.Router();

// Wrap the handler in an async arrow function to ensure proper typing and avoid overload errors
router.get('/', async (req: Request, res: Response) => {
  await getAllPlants(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
  await getPlantById(req, res);
});

router.post('/', async (req: Request, res: Response) => {
  await createPlant(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
  await updatePlant(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await deletePlant(req, res);
});

export default router;
