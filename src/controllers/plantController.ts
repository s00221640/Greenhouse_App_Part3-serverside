import Plant from '../models/plantModel';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const getAllPlants = async (req: Request, res: Response) => {
  console.log('\n--- getAllPlants ---');
  try {
    const user = (req as any).user;
    console.log('Full user object from request:', user);

    const email = user?.email; // Use email instead of userId
    console.log('User email extracted:', email);

    if (!email) {
      console.log('ERROR: No email found in request. Token might be malformed.');
      return res.status(401).json({ message: 'User email not found in token' });
    }

    // Fetch plants for this user by email
    const userPlants = await Plant.find({ userEmail: email });
    console.log(`Found ${userPlants.length} plants for user ${email}`);

    res.status(200).json(userPlants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Error fetching plants' });
  }
};

export const getPlantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userEmail = (req as any).user.email;

  try {
    console.log(`Looking for plant with id ${id} for user ${userEmail}`);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const plant = await Plant.findOne({ _id: id, userEmail: userEmail });

    if (!plant) {
      console.log(`No plant found with id ${id} for user ${userEmail}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log(`Found plant: ${plant.name} with id ${id}`);
    res.status(200).json(plant);
  } catch (error) {
    console.error('Error fetching plant by ID:', error);
    res.status(500).json({ message: 'Error fetching plant.' });
  }
};

export const createPlant = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const email = user?.email; // Use email for simplicity

    if (!email) {
      return res.status(401).json({ message: 'User email not found' });
    }

    const { name, species, plantingDate, wateringFrequency, lightRequirement } = req.body;
    
    const plant = new Plant({
      name,
      species,
      plantingDate: plantingDate || null,
      wateringFrequency,
      lightRequirement,
      userEmail: email // Use email instead of ID
    });
    
    console.log('Plant before save:', JSON.stringify(plant));
    const savedPlant = await plant.save();
    console.log('Saved plant:', JSON.stringify(savedPlant));
    
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Error creating plant' });
  }
};

export const updatePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userEmail = (req as any).user.email;
  const updateData = req.body;

  try {
    console.log(`Updating plant ${id} for user ${userEmail}`);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: id, userEmail: userEmail },
      updateData,
      { new: true }
    );

    if (!updatedPlant) {
      console.log(`No plant found with id ${id} for user ${userEmail}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log('Plant updated successfully:', updatedPlant);
    res.status(200).json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ message: 'Error updating plant.' });
  }
};

export const deletePlant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userEmail = (req as any).user.email;

  try {
    console.log(`Deleting plant ${id} for user ${userEmail}`);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid Plant ID format.' });
    }

    const deletedPlant = await Plant.findOneAndDelete({ _id: id, userEmail: userEmail });

    if (!deletedPlant) {
      console.log(`No plant found with id ${id} for user ${userEmail}`);
      return res.status(404).json({ message: 'Plant not found.' });
    }

    console.log('Plant deleted successfully');
    res.status(200).json({ message: 'Plant deleted successfully.' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ message: 'Error deleting plant.' });
  }
};

export const deleteAllPlants = async (req: Request, res: Response) => {
  try {
    console.log('Deleting all plants from database...');
    const result = await Plant.deleteMany({});
    console.log(`Deleted ${result.deletedCount} plants`);
    res.status(200).json({ message: `Deleted ${result.deletedCount} plants` });
  } catch (error) {
    console.error('Error deleting all plants:', error);
    res.status(500).json({ message: 'Error deleting all plants', error });
  }
};
