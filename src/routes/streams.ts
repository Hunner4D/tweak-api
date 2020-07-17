import express from "express";
const router = express.Router();
const middleware = require("../middleware");
const streamsCtrl = require("../controllers/streams");

router.post(
  "/",
  middleware.checkInstance,
  middleware.checkPost,
  middleware.checkReferer,
  streamsCtrl.create
);

module.exports = router;
