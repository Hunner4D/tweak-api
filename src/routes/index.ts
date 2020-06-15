import express from "express";
const router = express.Router();
const streamsCtrl = require("../controllers/streams");

router.post("/", streamsCtrl.create);

module.exports = router;
