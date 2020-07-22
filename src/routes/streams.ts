import express from "express";
const router = express.Router();
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
  "/:idToken/:userInstance",
  middleware.compareTokenToInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.myStreams
);

router.post(
  "/",
  middleware.compareTokenToInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.create
);

router.put(
  "/:streamId",
  middleware.compareTokenToInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.edit
);

router.delete(
  "/",
  middleware.compareTokenToInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.deleteStream
);

module.exports = router;
