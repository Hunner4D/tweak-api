import express from "express";
const router = express.Router();
const middleware = require("../middleware");
const userCtrl = require("../controllers/user");

router.post("/", middleware.auth, userCtrl.signIn);

module.exports = router;
