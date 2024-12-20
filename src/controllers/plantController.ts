import Plant from '../models/plantModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const getAllPlants = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id; // Ensure we're using `_id` from the token
    const plants = await Plant.find({ userId }); // Filter by userId
    res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Error fetching plants' });
  }
};

export const getPlantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user._id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const plant = await Plant.findOne({ _id: id, userId }); // Ensure plant belongs to the user
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found.' });
    }

    res.status(200).json(plant);
  } catch (error) {
    console.error('Error fetching plant by ID:', error);
    res.status(500).json({ message: 'Error fetching plant.' });
  }
};

export const createPlant = async (req: Request, res: Response) => {
  const userId = (req as any).user._id; // Extract user ID from token
  const { name, species, plantingDate, wateringFrequency, lightRequirement } = req.body;

  try {
    // Log the user ID for debugging
    console.log('User ID for new plant:', userId);

    const plant = new Plant({
      name,
      species,
      plantingDate,
      wateringFrequency,
      lightRequirement,
      userId, 
    });

    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Error creating plant' });
  }
};


export const updatePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user._id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: id, userId }, // Ensure only the user's plant can be updated
      req.body,
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found.' });
    }

    res.status(200).json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ message: 'Error updating plant.' });
  }
};

export const deletePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user._id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const deletedPlant = await Plant.findOneAndDelete({ _id: id, userId }); // Ensure only the user's plant can be deleted
    if (!deletedPlant) {
      return res.status(404).json({ message: 'Plant not found.' });
    }

    res.status(200).json({ message: 'Plant deleted successfully.' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Error deleting plant.' });
  }
};
