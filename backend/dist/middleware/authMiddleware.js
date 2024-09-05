"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(403).send('Error 401 : Access denied.');
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = verified; // Add the decoded token to the request object
        next(); // Call the next middleware or route handler
    }
    catch (err) {
        res.status(400).send('Invalid token.');
    }
};
exports.default = verifyToken;
