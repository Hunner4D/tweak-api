import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const User = require("../models/user");

module.exports = {
  signIn,
};

function signIn(req: Request, res: Response) {
  let query = { ...req.body };
  console.log("sign in query: ", query);
  const instance: String = uuidv4();
  res.json({ instance });
}
