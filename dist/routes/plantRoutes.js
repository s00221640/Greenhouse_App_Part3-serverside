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
const express_1 = __importDefault(require("express"));
const plantController_1 = require("../controllers/plantController");
const auth_middleware_1 = require("../auth.middleware");
const router = express_1.default.Router();
// Apply middleware to all routes
router.use(auth_middleware_1.authenticateKey);
// Fetch all plants
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plantController_1.getAllPlants)(req, res);
    }
    catch (error) {
        console.error('Error in GET /:', error);
        res.status(500).json({ message: 'Error fetching all plants', error });
    }
}));
// Fetch a plant by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plantController_1.getPlantById)(req, res);
    }
    catch (error) {
        console.error('Error in GET /:id:', error);
        res.status(500).json({ message: 'Error fetching plant by ID', error });
    }
}));
// Create a new plant
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plantController_1.createPlant)(req, res);
    }
    catch (error) {
        console.error('Error in POST /:', error);
        res.status(500).json({ message: 'Error creating plant', error });
    }
}));
// Update a plant by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plantController_1.updatePlant)(req, res);
    }
    catch (error) {
        console.error('Error in PUT /:id:', error);
        res.status(500).json({ message: 'Error updating plant', error });
    }
}));
// Delete a plant by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, plantController_1.deletePlant)(req, res);
    }
    catch (error) {
        console.error('Error in DELETE /:id:', error);
        res.status(500).json({ message: 'Error deleting plant', error });
    }
}));
exports.default = router;
