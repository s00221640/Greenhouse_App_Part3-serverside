"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const authenticateKey = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided. Unauthorized access.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log('Authentication successful for user:', decoded);
        req.user = decoded; //Attach user info to the request object
        next();
    }
    catch (error) {
        console.error('Invalid token:', error);
        res.status(403).json({ message: 'Invalid token. Unauthorized access.' });
    }
};
exports.authenticateKey = authenticateKey;
