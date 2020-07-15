import { NextFunction, Request, Response } from "express";
const Stream = require('../models/streams')

module.exports = {
  create
}

function create(req: Request, res: Response) {
  let query = { ...req.body  };
  console.log("create stream query:", query);

  res.json();
};

