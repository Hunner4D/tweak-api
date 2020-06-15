import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";

const app: Application = express();

require("dotenv").config();
// require("./config/database");

app.use(logger("dev"));
app.use(express.json());

app.use("/streams", require("./routes/index"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  //   console.log("express", express);
  //   console.log("path", path);
  res.send("Hello");
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Server Running..."));
