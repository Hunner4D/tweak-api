import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

require("dotenv").config();
require("./config/database");
app.use(logger("dev"));
app.use(express.json());

let corsOptions: Object = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type'],
}

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  }
}))
app.use(helmet.noCache());
app.use(helmet.permittedCrossDomainPolicies())
app.use(cors(corsOptions));

app.use("/user", require("./routes/user"));
app.use("/streams", require("./routes/streams"));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server Running..."));
