"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const imageSchema = new mongoose_1.default.Schema({
    imageUrl: String,
    publicId: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Image', imageSchema);
//# sourceMappingURL=Image.js.map