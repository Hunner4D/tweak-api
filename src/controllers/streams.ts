import { NextFunction, Request, Response } from "express";
import { Base64 } from "js-base64";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Stream = require("../models/streams");
const User = require("../models/user");

module.exports = {
  getAll,
  get,
  create,
  edit,
  deleteStream,
};

function getAll(req: Request, res: Response) {
  Stream.find().then((streams: any) => {
    let refactoredArray: object[] = [];
    _.forEach(streams, (item, i) => {
      refactoredArray.push(_.pick(item, ["uuid", "owner", "title", "description"]));
    });
    res.json(refactoredArray);
  });
}

function get(req: Request, res: Response) {
  console.log("get specific stream hit");
  res.json();
}

function create(req: Request, res: Response) {
  let uuid: String = uuidv4();
  new Stream({
    uuid,
    owner: req.user.username,
    title: req.body.title,
    description: req.body.description,
  })
    .save()
    .then(() => {
      User.findOne(req.user).then((user: any) => {
        user.streams.push(uuid);
        user.save();
        res.json();
      });
    });
}

function edit(req: Request, res: Response) {
  console.log("edit stream req.body", req.body);
  Stream.find({ uuid: req.body.formInfo.streamId }).then((stream: any) => {
    console.log("stream found: ", stream);
    if (stream[0].userId === req.body.userId) {
      stream[0].title = req.body.formInfo.title;
      stream[0].description = req.body.formInfo.description;
      stream[0].save();
      res.json();
    } else {
      return res.send(401);
    }
  });
  res.json();
}

function deleteStream(req: Request, res: Response) {
  Stream.find({ uuid: req.params.streamId }).then((stream: any) => {
    if (stream[0].userId === req.params.userId) {
      Stream.remove(stream[0]).then(() => res.json());
    } else {
      return res.send(401);
    }
  });
}
