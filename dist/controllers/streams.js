"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = require("uuid");
const Stream = require("../models/streams");
const User = require("../models/user");
module.exports = {
    getAll,
    get,
    create,
    edit,
    deleteStream,
};
function getAll(req, res) {
    Stream.find().then((streams) => {
        let refactoredArray = [];
        lodash_1.default.forEach(streams, (item, i) => {
            refactoredArray.push(lodash_1.default.pick(item, ["uuid", "title", "description"]));
        });
        res.json(refactoredArray);
    });
}
function get(req, res) {
    console.log("get specific stream hit");
    res.json();
}
function create(req, res) {
    let uuid = uuid_1.v4();
    new Stream({
        uuid,
        title: req.body.title,
        description: req.body.description,
    })
        .save()
        .then(() => {
        User.findOne(req.user).then((user) => {
            user.streams.push(uuid);
            user.save();
            res.json();
        });
    });
}
function edit(req, res) {
    console.log("edit stream req.body", req.body);
    Stream.find({ uuid: req.body.formInfo.streamId }).then((stream) => {
        console.log("stream found: ", stream);
        if (stream[0].userId === req.body.userId) {
            stream[0].title = req.body.formInfo.title;
            stream[0].description = req.body.formInfo.description;
            stream[0].save();
            res.json();
        }
        else {
            return res.send(401);
        }
    });
    res.json();
}
function deleteStream(req, res) {
    Stream.find({ uuid: req.params.streamId }).then((stream) => {
        if (stream[0].userId === req.params.userId) {
            Stream.remove(stream[0]).then(() => res.json());
        }
        else {
            return res.send(401);
        }
    });
}
