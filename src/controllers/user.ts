import { NextFunction, Request, Response } from "express";
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.OAUTH_CLIENT);
const User = require("../models/user");

module.exports = {
  signIn,
  generateStreamKey,
  getStreamKey
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
                stream_key: user.stream_key,
                newUser: false,
                username: user.username,
                profileImage: user.profileImage,
              });
            } else {
              const instance: String = uuidv4();
              const stream_key: String = uuidv4();
              new User({
                userId,
                uuid: instance,
                username: payload.name,
                profileImage: payload.picture,
                email: payload.email,
                stream_key
              })
                .save()
                .then((createdUser: any) => {
                  // console.log("created new user: ", createdUser);
                  res.send({
                    instance,
                    stream_key,
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

function getStreamKey(req: Request, res: Response) {
  console.log("get stream key hit", req.user);
  res.json({stream_key: req.user.stream_key})
}

function generateStreamKey(req: Request, res: Response) {
  User.findOne(req.user).then((user: any )=> {
    const stream_key = uuidv4();
    user.stream_key = stream_key;
    user.save()
    res.json({ stream_key })
  }).catch((err: any) => res.send(401))
}
