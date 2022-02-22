"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const passport_2 = require("./config/passport");
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
//Allow CORS
app.use(cors_1.default());
// Use common 3rd-party middlewares
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Middleware for fileupload to cloudinary
/* eslint-disable  @typescript-eslint/no-var-requires*/
//const fileupload = require('express-fileupload')
app.use(express_fileupload_1.default({ useTempFiles: true }));
/* eslint-enable  @typescript-eslint/no-var-requires */
passport_1.default.use(passport_2.jwtStrategy);
// User router
app.use('/api/v1/users', userRouter_1.default);
//Auth Router
app.use('/api/v1/auth', authRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map