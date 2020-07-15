import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";

const app: Application = express();

require("dotenv").config();
// require("./config/database");

let corsOptions: Object = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type'],
  methods: ["GET"]
}

app.use(cors(corsOptions))

app.use(logger("dev"));
app.use(express.json());

app.use("/user", require("./routes/user"));
app.use("/streams", require("./routes/streams"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  //   console.log("express", express);
  //   console.log("path", path);
  res.send("Hello");
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server Running..."));
