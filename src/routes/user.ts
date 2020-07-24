import express from "express";
const router = express.Router();
const middleware = require("../middleware");
const userCtrl = require("../controllers/user");

router.post(
  "/",
  middleware.checkMethod,
  middleware.checkReferer,
  userCtrl.signIn
);

router.post(
  "/:settings/:stream_key",
  middleware.compareTokenToInstance,
  middleware.checkMethod,
  middleware.checkReferer,
  userCtrl.generateStreamKey
);

// router.get(
//   "settings/stream_key",
//   middleware.compareTokenToInstance,
//   middleware.checkMethod,
//   middleware.checkReferer,
//   userCtrl.getStreamKey
// );

module.exports = router;
