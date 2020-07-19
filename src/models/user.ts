import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String,
    uuid: String,
    username: String,
    profileImage: String,
});

module.exports = mongoose.model("User", userSchema)