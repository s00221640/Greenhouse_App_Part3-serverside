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
exports.deleteAllPlants = exports.deletePlant = exports.updatePlant = exports.createPlant = exports.getPlantById = exports.getAllPlants = void 0;
const plantModel_1 = __importDefault(require("../models/plantModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\n--- getAllPlants ---');
    try {
        const user = req.user;
        console.log('Full user object from request:', user);
        const email = user === null || user === void 0 ? void 0 : user.email; // Use email instead of userId
        console.log('User email extracted:', email);
        if (!email) {
            console.log('ERROR: No email found in request. Token might be malformed.');
            return res.status(401).json({ message: 'User email not found in token' });
        }
        // Fetch plants for this user by email
        const userPlants = yield plantModel_1.default.find({ userEmail: email });
        console.log(`Found ${userPlants.length} plants for user ${email}`);
        res.status(200).json(userPlants);
    }
    catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ message: 'Error fetching plants' });
    }
});
exports.getAllPlants = getAllPlants;
const getPlantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userEmail = req.user.email;
    try {
        console.log(`Looking for plant with id ${id} for user ${userEmail}`);
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const plant = yield plantModel_1.default.findOne({ _id: id, userEmail: userEmail });
        if (!plant) {
            console.log(`No plant found with id ${id} for user ${userEmail}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log(`Found plant: ${plant.name} with id ${id}`);
        res.status(200).json(plant);
    }
    catch (error) {
        console.error('Error fetching plant by ID:', error);
        res.status(500).json({ message: 'Error fetching plant.' });
    }
});
exports.getPlantById = getPlantById;
const createPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const email = user === null || user === void 0 ? void 0 : user.email; // Use email for simplicity
        if (!email) {
            return res.status(401).json({ message: 'User email not found' });
        }
        const { name, species, plantingDate, wateringFrequency, lightRequirement } = req.body;
        const plant = new plantModel_1.default({
            name,
            species,
            plantingDate: plantingDate || null,
            wateringFrequency,
            lightRequirement,
            userEmail: email // Use email instead of ID
        });
        console.log('Plant before save:', JSON.stringify(plant));
        const savedPlant = yield plant.save();
        console.log('Saved plant:', JSON.stringify(savedPlant));
        res.status(201).json(savedPlant);
    }
    catch (error) {
        console.error('Error creating plant:', error);
        res.status(500).json({ message: 'Error creating plant' });
    }
});
exports.createPlant = createPlant;
const updatePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userEmail = req.user.email;
    const updateData = req.body;
    try {
        console.log(`Updating plant ${id} for user ${userEmail}`);
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const updatedPlant = yield plantModel_1.default.findOneAndUpdate({ _id: id, userEmail: userEmail }, updateData, { new: true });
        if (!updatedPlant) {
            console.log(`No plant found with id ${id} for user ${userEmail}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log('Plant updated successfully:', updatedPlant);
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
    const userEmail = req.user.email;
    try {
        console.log(`Deleting plant ${id} for user ${userEmail}`);
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Plant ID format.' });
        }
        const deletedPlant = yield plantModel_1.default.findOneAndDelete({ _id: id, userEmail: userEmail });
        if (!deletedPlant) {
            console.log(`No plant found with id ${id} for user ${userEmail}`);
            return res.status(404).json({ message: 'Plant not found.' });
        }
        console.log('Plant deleted successfully');
        res.status(200).json({ message: 'Plant deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({ message: 'Error deleting plant.' });
    }
});
exports.deletePlant = deletePlant;
const deleteAllPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Deleting all plants from database...');
        const result = yield plantModel_1.default.deleteMany({});
        console.log(`Deleted ${result.deletedCount} plants`);
        res.status(200).json({ message: `Deleted ${result.deletedCount} plants` });
    }
    catch (error) {
        console.error('Error deleting all plants:', error);
        res.status(500).json({ message: 'Error deleting all plants', error });
    }
});
exports.deleteAllPlants = deleteAllPlants;
