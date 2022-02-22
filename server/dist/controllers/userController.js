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
exports.addImageToUser = exports.deleteUser = exports.editUser = exports.findUserById = exports.findUsers = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../util/secret"); // under normal circumstances, hide this
const User_1 = __importDefault(require("../models/User"));
const userServices_1 = __importDefault(require("../services/userServices"));
const apiError_1 = require("../helpers/apiError");
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, firstName, lastName, isAdmin, image } = req.body;
        const hasUserMail = yield userServices_1.default.findUserByEmail(email);
        const hasUserName = yield userServices_1.default.findUserByUsername(username);
        if (hasUserName || hasUserMail)
            return res.status(400).json({ error: 'User already exists' });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new User_1.default({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            isAdmin,
            image,
        });
        yield userServices_1.default.createUser(user);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userServices_1.default.findUserByEmail(email);
        if (user) {
            const isCorrectPassword = yield bcrypt_1.default.compare(password, user.password);
            console.log(password, user.password);
            if (!isCorrectPassword) {
                return next(new apiError_1.BadRequestError('Incorrect password'));
            }
            const loginToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, secret_1.JWT_SECRET, { expiresIn: '24h' });
            res.json({ loginToken, user });
        }
        else {
            next(new apiError_1.NotFoundError('E-Mail address does not exist'));
        }
    }
    catch (error) {
        next(new apiError_1.BadRequestError('Internal server error'));
    }
});
exports.findUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield userServices_1.default.findUsers());
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield userServices_1.default.findUserById(req.query.userId)); // note: for obvious reasons, don't return the password or other sensitive info in a real/production project
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const dataToUpdate = req.query.body;
        const updatedUser = yield userServices_1.default.editUser(userId, dataToUpdate);
        res.json(updatedUser);
        console.log(updatedUser);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield userServices_1.default.deleteUser(req.params.userId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.addImageToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const imageId = req.params.imageId;
        const updatedUser = yield userServices_1.default.addImageToUser(userId, imageId);
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=userController.js.map