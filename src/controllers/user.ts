import { NextFunction, Request, Response } from "express";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
const User = require("../models/user");

module.exports = {
  signIn,
};

function signIn(req: Request, res: Response) {
  let bytes = req.body.bytes;
  let decoded = Base64.atob(bytes);

  User.findOne({ userId: decoded })
    .then((user: any) => {
      if (user) {
        console.log("user exists: ", user);
        const instance: String = uuidv4();
        user.uuid = instance;
        user.save();
        res.json({ instance, newUser: false });
      } else {
        const instance: String = uuidv4();
        new User({
          userId: decoded,
          uuid: instance,
          username: req.body.username,
          profileImage: req.body.profileImage,
        })
          .save()
          .then((createdUser: any) => {
            console.log("created new user: ", createdUser);
            res.send({ instance, newUser: true });
          });
      }
    })
    .catch();
}
