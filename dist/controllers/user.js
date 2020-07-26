"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.OAUTH_CLIENT);
const User = require("../models/user");
module.exports = {
    signIn,
    editProfile,
};
function signIn(req, res) {
    client
        .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.OAUTH_CLIENT,
    })
        .then((ticket) => {
        const payload = ticket.getPayload();
        const userId = payload["sub"];
        // console.log(payload);
        if (payload.email_verified) {
            User.findOne({ userId })
                .then((user) => {
                if (user) {
                    // console.log("user exists: ", user);
                    const instance = uuid_1.v4();
                    user.uuid = instance;
                    user.save();
                    res.json({
                        // userId,
                        instance,
                        newUser: false,
                        username: user.username,
                        profileImage: user.profileImage,
                        category: user.category,
                        about: user.about,
                    });
                }
                else {
                    const instance = uuid_1.v4();
                    new User({
                        userId,
                        uuid: instance,
                        username: payload.name,
                        profileImage: payload.picture,
                        email: payload.email,
                        category: "Streamer",
                        about: "",
                    })
                        .save()
                        .then((createdUser) => {
                        // console.log("created new user: ", createdUser);
                        res.send({
                            instance,
                            newUser: true,
                            username: createdUser.username,
                            profileImage: createdUser.profileImage,
                            category: "Streamer",
                            about: "",
                        });
                    });
                }
            })
                .catch();
        }
        else {
            return res.send(401);
        }
    });
}
function editProfile(req, res) {
    User.findOne(req.user).then((user) => {
        if (req.body.data.username)
            user.username = req.body.data.username;
        if (req.body.data.category)
            user.category = req.body.data.category;
        if (req.body.data.about)
            user.about = req.body.data.about;
        user.save();
        res.json({
            username: user.username,
            category: user.category,
            about: user.about,
        });
    });
}
