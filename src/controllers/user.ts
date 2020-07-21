import { NextFunction, Request, Response } from "express";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.OAUTH_CLIENT);
const User = require("../models/user");

module.exports = {
  signIn,
};

function signIn(req: Request, res: Response) {
  client
    .verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.OAUTH_CLIENT,
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((ticket) => {
      const payload: any = ticket.getPayload();
      const userId = payload["sub"];
      // console.log(payload);

      if (payload.email_verified) {
        User.findOne({ userId })
          .then((user: any) => {
            if (user) {
              // console.log("user exists: ", user);
              const instance: String = uuidv4();
              user.uuid = instance;
              user.save();
              res.json({
                // userId,
                instance,
                newUser: false,
                username: user.username,
                profileImage: user.profileImage,
              });
            } else {
              const instance: String = uuidv4();
              new User({
                userId,
                uuid: instance,
                username: payload.name,
                profileImage: payload.picture,
                email: payload.email
              })
                .save()
                .then((createdUser: any) => {
                  // console.log("created new user: ", createdUser);
                  res.send({
                    // userId,
                    instance,
                    newUser: true,
                    username: createdUser.username,
                    profileImage: createdUser.profileImage,
                  });
                });
            }
          })
          .catch();
      }
      else {
        return res.send(401)
      }
    });
}
