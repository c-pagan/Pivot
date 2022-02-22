"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/member-delimiter-style */
const mongoose_1 = __importDefault(require("mongoose"));
const issueSchema = new mongoose_1.default.Schema({
    title: { type: String },
    description: { type: String },
    priority: { type: String },
    issue_type: { type: String },
    status: { type: String },
    assignee: { type: String },
    project: { type: String }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Issue', issueSchema);
//# sourceMappingURL=Issues.js.map