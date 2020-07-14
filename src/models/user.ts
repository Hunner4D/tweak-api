import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uuid: String,
    userId: String
});

module.exports = mongoose.model("User", userSchema)