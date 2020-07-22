import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String,
    uuid: String,
    username: String,
    profileImage: String,
    email: String,
    streams: [String],
    stream_key: String
});

module.exports = mongoose.model("User", userSchema)