"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateKey = void 0;
const authenticateKey = (req, res, next) => {
    //No key yet
    console.log("Authentication middleware triggered");
    next();
};
exports.authenticateKey = authenticateKey;
