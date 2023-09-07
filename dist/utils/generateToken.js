"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id, isAdmin) => {
    const token = jsonwebtoken_1.default.sign({ id, isAdmin: isAdmin !== null && isAdmin !== void 0 ? isAdmin : false }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
exports.default = generateToken;
