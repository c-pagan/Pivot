"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = express_1.Router();
router.post('/register', userController_1.createUser);
router.post('/login', userController_1.loginUser);
exports.default = router;
//# sourceMappingURL=authRouter.js.map