"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlant = exports.updatePlant = exports.createPlant = exports.getPlantById = exports.getAllPlants = void 0;
const plantModel_1 = __importDefault(require("../models/plantModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching all plants from database...');
        const plants = yield plantModel_1.default.find({});
        console.log('Fetched plants:', plants);
        res.status(200).json(plants);
    }
    catch (error) {
        console.error('Error fetching all plants:', error);
        res.status(500).json({ message: 'Error fetching plants' });
    }
});
exports.getAllPlants = getAllPlants;
const getPlantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Fetching plant by ID: ${id}`);
    try {
        if (!mongoose_1.default.isValidObjectId(id)) {
            console.error('Invalid ObjectId format.');
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const plant = yield plantModel_1.default.findById(id);
        if (!plant) {
            console.warn(`No plant found with ID: ${id}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log(`Plant found: ${JSON.stringify(plant)}`);
        res.status(200).json(plant);
    }
    catch (error) {
        console.error(`Error fetching plant with ID ${id}:`, error);
        res.status(500).json({ message: 'Error fetching plant.' });
    }
});
exports.getPlantById = getPlantById;
const createPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, species, plantingDate, wateringFrequency, lightRequirement } = req.body;
    console.log('Creating new plant with data:', req.body);
    try {
        const plant = new plantModel_1.default({ name, species, plantingDate, wateringFrequency, lightRequirement });
        const newPlant = yield plant.save();
        console.log('Created new plant:', newPlant);
        res.status(201).json(newPlant);
    }
    catch (error) {
        console.error('Error creating plant:', error);
        res.status(500).json({ message: 'Error creating plant' });
    }
});
exports.createPlant = createPlant;
const updatePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Updating plant with ID:', id, 'and data:', req.body);
    try {
        if (!mongoose_1.default.isValidObjectId(id)) {
            console.error('Invalid ObjectId format.');
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const updatedPlant = yield plantModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPlant) {
            console.warn(`No plant found with ID: ${id}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log('Successfully updated plant:', updatedPlant);
        res.status(200).json(updatedPlant);
    }
    catch (error) {
        console.error('Error updating plant:', error);
        res.status(500).json({ message: 'Error updating plant.' });
    }
});
exports.updatePlant = updatePlant;
const deletePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Deleting plant with ID:', id);
    try {
        if (!mongoose_1.default.isValidObjectId(id)) {
            console.error('Invalid ObjectId format.');
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const deletedPlant = yield plantModel_1.default.findByIdAndDelete(id);
        if (!deletedPlant) {
            console.warn(`No plant found with ID: ${id}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log('Successfully deleted plant:', deletedPlant);
        res.status(200).json({ message: 'Plant deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({ message: 'Error deleting plant.' });
    }
});
exports.deletePlant = deletePlant;
