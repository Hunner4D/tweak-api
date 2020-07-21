"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const streamSchema = new Schema({
    uuid: String,
    owner: String,
    title: String,
    description: String
});
module.exports = mongoose_1.default.model("Streams", streamSchema);
