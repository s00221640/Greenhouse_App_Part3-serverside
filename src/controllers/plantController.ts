import { Request, Response } from 'express';
import Plant from '../models/plantModel';

// Get all plants
export const getAllPlants = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const plants = await Plant.find();
    return res.status(200).json(plants);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get plant by ID
export const getPlantById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    return res.status(200).json(plant);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new plant
export const createPlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const newPlant = new Plant(req.body);
    const savedPlant = await newPlant.save();
    return res.status(201).json(savedPlant);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Update a plant by ID
export const updatePlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({ message: 'Plant not found' });
    return res.status(200).json(updatedPlant);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a plant by ID
export const deletePlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) return res.status(404).json({ message: 'Plant not found' });
    return res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
