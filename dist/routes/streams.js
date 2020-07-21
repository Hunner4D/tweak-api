"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const middleware = require("../middleware");
const streamsCtrl = require("../controllers/streams");
router.get("/", middleware.checkMethod, middleware.checkReferer, streamsCtrl.getAll);
router.get("/:id", middleware.checkMethod, middleware.checkReferer, streamsCtrl.get);
router.post("/", middleware.compareTokenToInstance, middleware.checkMethod, middleware.checkReferer, streamsCtrl.create);
router.put("/:streamId", middleware.compareTokenToInstance, middleware.checkMethod, middleware.checkReferer, streamsCtrl.edit);
router.delete("/:streamId/:userId/:userInstance", middleware.matchInstanceToUserParams, middleware.checkMethod, middleware.checkReferer, streamsCtrl.deleteStream);
module.exports = router;
