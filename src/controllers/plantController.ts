import Plant from '../models/plantModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const getAllPlants = async (req: Request, res: Response) => {
  try {
    console.log('Fetching all plants from database...');
    const plants = await Plant.find({});
    console.log('Fetched plants:', plants);
    res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching all plants:', error);
    res.status(500).json({ message: 'Error fetching plants' });
  }
};

export const getPlantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`Fetching plant by ID: ${id}`);

  try {
    if (!mongoose.isValidObjectId(id)) {
      console.error('Invalid ObjectId format.');
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const plant = await Plant.findById(id);

    if (!plant) {
      console.warn(`No plant found with ID: ${id}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log(`Plant found: ${JSON.stringify(plant)}`);
    res.status(200).json(plant);
  } catch (error) {
    console.error(`Error fetching plant with ID ${id}:`, error);
    res.status(500).json({ message: 'Error fetching plant.' });
  }
};

export const createPlant = async (req: Request, res: Response) => {
  const { name, species, plantingDate, wateringFrequency, lightRequirement } = req.body;
  console.log('Creating new plant with data:', req.body);

  try {
    const plant = new Plant({ name, species, plantingDate, wateringFrequency, lightRequirement });
    const newPlant = await plant.save();
    console.log('Created new plant:', newPlant);
    res.status(201).json(newPlant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Error creating plant' });
  }
};

export const updatePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Updating plant with ID:', id, 'and data:', req.body);

  try {
    if (!mongoose.isValidObjectId(id)) {
      console.error('Invalid ObjectId format.');
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPlant) {
      console.warn(`No plant found with ID: ${id}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log('Successfully updated plant:', updatedPlant);
    res.status(200).json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ message: 'Error updating plant.' });
  }
};

export const deletePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Deleting plant with ID:', id);

  try {
    if (!mongoose.isValidObjectId(id)) {
      console.error('Invalid ObjectId format.');
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
      console.warn(`No plant found with ID: ${id}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log('Successfully deleted plant:', deletedPlant);
    res.status(200).json({ message: 'Plant deleted successfully.' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Error deleting plant.' });
  }
};
