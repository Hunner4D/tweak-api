import express from "express";
const router = express.Router();
import { NextFunction, Request, Response } from "express";
const middleware = require("../middleware");
const streamsCtrl = require("../controllers/streams");

router.get(
  "/",
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.getAll
);

router.get(
  "/:id",
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.get
);

router.post(
  "/",
  middleware.checkInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.create
);

router.put(
  "/:id",
  middleware.checkInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.edit
);

router.delete(
  "/:id",
  middleware.checkInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.deleteStream
);

module.exports = router;
