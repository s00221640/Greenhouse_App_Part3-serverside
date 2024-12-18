"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const plantRoutes_1 = __importDefault(require("./routes/plantRoutes"));
dotenv_1.default.config(); //.env file
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//Middleware to parse JSON
app.use(express_1.default.json());
//Routes 
app.use('/plants', plantRoutes_1.default);
//Database connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
app.get('/', (req, res) => {
    res.send('Welcome to the Greenhouse App!');
});
//startig the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
