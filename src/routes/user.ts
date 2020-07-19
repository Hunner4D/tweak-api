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

module.exports = router;
