"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mongoUri = 'mongodb+srv://cpagan:fNYJcZJYV59I2wrp@cluster0.agmne.mongodb.net/pivot';
mongoose_1.default
    .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    autoIndex: true,
})
    .then(() => {
    app_1.default.listen(process.env.PORT || 5000, () => console.log(`App running on port ${process.env.PORT}`));
})
    .catch((error) => {
    console.log('Mongodb connection error. Please make sure your mongodb is running.' + error);
});
//# sourceMappingURL=server.js.map