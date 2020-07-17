import { NextFunction, Request, Response } from "express";
import { WHITE_LISTED_METHODS } from "../utils/constants";
const User = require("../models/user");

module.exports = {
  checkInstance,
  checkPost,
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

function checkPost(req: Request, res: Response, next: NextFunction) {
  const { method } = req;
  // console.log(req)
  if (!["POST"].includes(method)) {
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
