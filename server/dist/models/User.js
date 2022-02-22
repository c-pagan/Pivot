"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: [true, 'That username is already taken'],
        required: [true, 'Enter a username'],
        min: [4, 'Min 4 characters required'],
    },
    email: {
        type: String,
        unique: [true, 'That Email is already taken'],
        required: [true, 'Enter a Email address'],
        match: [/.+\@.+\..+/, 'Not a valid Email address'],
    },
    password: { type: String, required: true, min: 8 },
    firstName: { type: String, min: [2, 'Min 2 characters required'] },
    lastName: { type: String, min: [2, 'Min 2 characters required'] },
    isAdmin: { type: Boolean },
    image: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Image' }]
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map