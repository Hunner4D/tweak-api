import express from "express";
const router = express.Router();
const middleware = require("../middleware");
const streamsCtrl = require("../controllers/streams");

router.post("/", middleware.auth, streamsCtrl.create);

module.exports = router;