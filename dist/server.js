"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
require("dotenv").config();
// require("./config/database");
let corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
    methods: ["GET"]
};
app.use(cors_1.default(corsOptions));
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use("/user", require("./routes/user"));
app.use("/streams", require("./routes/streams"));
app.get("/", (req, res, next) => {
    //   console.log("express", express);
    //   console.log("path", path);
    res.send("Hello");
});
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server Running..."));
