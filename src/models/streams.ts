import mongoose from "mongoose";
const Schema = mongoose.Schema;

const streamSchema = new Schema({
    userId: String,
    title: String,
    description: String
});

module.exports = mongoose.model("Streams", streamSchema)