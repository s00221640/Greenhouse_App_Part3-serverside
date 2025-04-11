"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Ensure environment variables are loaded
dotenv_1.default.config();
// Use the exact same SECRET_KEY as defined in your .env file
const SECRET_KEY = process.env.SECRET_KEY || 'super-secret-123';
const authenticateKey = (req, res, next) => {
    console.log('\n--- Auth Middleware ---');
    console.log('Headers:', JSON.stringify(req.headers));
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader === 'Bearer null') {
        console.log('No token provided in request');
        res.status(401).json({ message: 'No token provided. Unauthorized access.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        console.log('Token received:', token);
        console.log('Using SECRET_KEY for verification:', SECRET_KEY); // Debug line - remove in production
        const decoded = jsonwebtoken_1.default.decode(token);
        console.log('Token decoded (without verification):', decoded);
        const verified = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log('Token verified successfully:', verified);
        if (!verified._id) {
            console.log('ERROR: No id property in verified token!');
            console.log('Token contains:', Object.keys(verified).join(', '));
            res.status(401).json({ message: 'Invalid token format. Missing user ID.' });
            return;
        }
        req.user = verified;
        console.log('User object attached to request:', req.user);
        console.log('--- End Auth Middleware ---\n');
        next();
    }
    catch (error) {
        console.error('Invalid token:', error);
        res.status(403).json({ message: 'Invalid token. Unauthorized access.' });
    }
};
exports.authenticateKey = authenticateKey;
