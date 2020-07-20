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
  "/",
  middleware.matchInstanceToUser,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.create
);

router.put(
  "/:streamId/:userId/:userInstance",
  middleware.matchInstanceToUserParams,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.edit
);

router.delete(
  "/:streamId/:userId/:userInstance",
  middleware.matchInstanceToUserParams,
  middleware.checkMethod,
  middleware.checkReferer,
  streamsCtrl.deleteStream
);

module.exports = router;
