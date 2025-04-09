"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const plantRoutes_1 = __importDefault(require("./routes/plantRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware should come BEFORE routes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Debug Incoming Requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});
// Routes come after middleware
app.use('/users', userRoutes_1.default);
app.use('/plants', plantRoutes_1.default);
// Test CORS route
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS is working!' });
});
// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Greenhouse App!');
});
// Database connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
