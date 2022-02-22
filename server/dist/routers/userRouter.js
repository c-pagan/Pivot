"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
router.get('/', userController_1.findUsers);
router.post('/', userController_1.createUser);
router.get('/:userId', passport_1.default.authenticate('jwt', { session: false }), userController_1.findUserById);
router.put('/:userId', passport_1.default.authenticate('jwt', { session: false }), userController_1.editUser);
router.delete('/:userId', passport_1.default.authenticate('jwt', { session: false }), userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map