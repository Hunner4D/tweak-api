import { NextFunction, Request, Response } from "express";
import { WHITE_LISTED_METHODS } from "../utils/constants";
const User = require("../models/user");

module.exports = {
  checkInstance,
  checkMethod,
  checkReferer,
};

function checkInstance(req: Request, res: Response, next: NextFunction) {
  User.findOne({ uuid: req.body.userInstance }).then((user: any) => {
    if (user) {
      next();
    } else {
      return res.send(401);
    }
  });
}

function checkMethod(req: Request, res: Response, next: NextFunction) {
  const reqMethod = req.method;
  const routeMethods = Object.keys(req.route.methods)[0].toUpperCase();
  if (routeMethods !== reqMethod) {
    return res.send(401);
  }
  next();
}

function checkReferer(req: Request, res: Response, next: NextFunction) {
  const referer = req.headers.referer;
  // console.log(referer);
  if (!referer || !referer.includes("http://localhost:3000")) {
    return res.send(401);
  }
  next();
}

export const bruh = () => 2;
