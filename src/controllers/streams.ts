import { NextFunction, Request, Response } from "express";
import { Base64 } from "js-base64";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Stream = require("../models/streams");

module.exports = {
  getAll,
  get,
  create,
  edit,
  deleteStream
};

function getAll(req: Request, res: Response) {
  Stream.find().then((streams: any) => {
    let refactoredArray: object[] = [];
    _.forEach(streams, (item, i) => {
      refactoredArray.push(_.pick(item, ["userId", "uuid", "title", "description"]));
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
    userId: req.body.userId,
    uuid,
    title: req.body.title,
    description: req.body.description,
  }).save();

  res.json();
}

function edit(req: Request, res: Response) {
  console.log("edit stream hit");
  res.json();
}

function deleteStream(req: Request, res: Response) {
  Stream.find({uuid: req.params.streamId}).then((stream: any) => {
    if (stream[0].userId === req.params.userId) {
      Stream.remove(stream[0]).then(() => res.json());
    }
    else {
      return res.send(401);
    }
  })
}
