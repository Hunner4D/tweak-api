"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
require("dotenv").config();
// require("./config/database");
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    console.log("express", express_1.default);
    console.log("path", path_1.default);
    res.send("Hello");
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server Running..."));
