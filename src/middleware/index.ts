import { NextFunction, Request, Response } from "express";
import { WHITE_LISTED_METHODS } from "../utils/constants";
import { Base64 } from "js-base64";
import { OAuth2Client } from "google-auth-library";
import { request } from "http";
const client = new OAuth2Client(process.env.OAUTH_CLIENT);
const User = require("../models/user");

module.exports = {
  compareTokenToInstance,
  compareTokenToInstanceParams,
  // checkInstance,
  // matchInstanceToUser,
  // matchInstanceToUserParams,
  checkMethod,
  checkReferer,
};

function compareTokenToInstance(req: Request, res: Response, next: NextFunction) {
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
        User.findOne({userId}).then((user: any) => {
          if(user.uuid === req.body.userInstance) {
            req.user = user;
            next()
          }
          else {
            return res.send(401);
          }
        })
      }
      else {
        return res.send(401);
      }
    });
}

function compareTokenToInstanceParams(req: Request, res: Response, next: NextFunction) {
  client
    .verifyIdToken({
      idToken: req.params.idToken,
      audience: process.env.OAUTH_CLIENT,
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((ticket) => {
      const payload: any = ticket.getPayload();
      const userId = payload["sub"];
      // console.log(payload);

      if (payload.email_verified) {
        User.findOne({userId}).then((user: any) => {
          if(user.uuid === req.params.userInstance) {
            req.user = user;
            next()
          }
          else {
            return res.send(401);
          }
        })
      }
      else {
        return res.send(401);
      }
    });
}

// function checkInstance(req: Request, res: Response, next: NextFunction) {
//   User.findOne({ uuid: req.body.userInstance }).then((user: any) => {
//     if (user) {
//       next();
//     } else {
//       return res.send(401);
//     }
//   });
// }

// function matchInstanceToUser(req: Request, res: Response, next: NextFunction) {
//   let decoded = Base64.atob(req.body.userId);
//   User.findOne({ userId: decoded }).then((user: any) => {
//     if (user && req.body.userInstance === user.uuid) {
//       next();
//     } else {
//       return res.send(401);
//     }
//   });
// }

// function matchInstanceToUserParams(req: Request, res: Response, next: NextFunction) {
//   let decoded = Base64.atob(req.params.userId);
//   User.findOne({ userId: decoded }).then((user: any) => {
//     if (user && req.params.userInstance === user.uuid) {
//       next();
//     } else {
//       return res.send(401);
//     }
//   });
// }

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
