import express from "express";
const router = express.Router();
const middleware = require("../middleware");
const rtmpCtrl = require("../controllers/rtmp");

router.get(
  "/",
  middleware.checkMethod,
  middleware.checkReferer,
  rtmpCtrl.getAll
);

router.get(
  "/:streamId",
  middleware.checkMethod,
  middleware.checkReferer,
  rtmpCtrl.getOne
);

module.exports = router;