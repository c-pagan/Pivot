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
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const userServices_1 = __importDefault(require("../services/userServices"));
const secret_1 = require("../util/secret"); // under normal circumstances, hide this
exports.jwtStrategy = new passport_jwt_1.Strategy({
    secretOrKey: secret_1.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = payload.email;
    const foundUser = yield userServices_1.default.findUserByEmail(userEmail);
    done(null, foundUser);
}));
//# sourceMappingURL=passport.js.map