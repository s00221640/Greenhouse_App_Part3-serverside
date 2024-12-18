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
// Get all plants
const getAllPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plants = yield plantModel_1.default.find();
        return res.status(200).json(plants);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllPlants = getAllPlants;
// Get plant by ID
const getPlantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plant = yield plantModel_1.default.findById(req.params.id);
        if (!plant)
            return res.status(404).json({ message: 'Plant not found' });
        return res.status(200).json(plant);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPlantById = getPlantById;
// Create a new plant
const createPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlant = new plantModel_1.default(req.body);
        const savedPlant = yield newPlant.save();
        return res.status(201).json(savedPlant);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createPlant = createPlant;
// Update a plant by ID
const updatePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPlant = yield plantModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlant)
            return res.status(404).json({ message: 'Plant not found' });
        return res.status(200).json(updatedPlant);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.updatePlant = updatePlant;
// Delete a plant by ID
const deletePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlant = yield plantModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPlant)
            return res.status(404).json({ message: 'Plant not found' });
        return res.status(200).json({ message: 'Plant deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deletePlant = deletePlant;
