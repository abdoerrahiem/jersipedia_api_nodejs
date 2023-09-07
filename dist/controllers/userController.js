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
exports.getCurrentUser = exports.register = exports.login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (yield user.comparePassword(password)) {
        res.json({
            success: true,
            token: (0, generateToken_1.default)(user._id, user.isAdmin),
        });
    }
    else {
        res.status(400);
        throw new Error("Email or password incorrect.");
    }
}));
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredUser = yield User_1.default.findOne({ email: req.body.email });
    if (registeredUser) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const user = new User_1.default(Object.assign(Object.assign({}, req.body), { photo: process.env.DEFAULT_USER_IMAGE }));
    yield user.save();
    res.json({
        success: true,
        token: (0, generateToken_1.default)(user._id, user.isAdmin),
    });
}));
exports.getCurrentUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        success: true,
        user: req.user,
    });
}));
