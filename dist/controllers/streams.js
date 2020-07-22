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
    myStreams,
    create,
    edit,
    deleteStream,
};
function getAll(req, res) {
    Stream.find().then((streams) => {
        let refactoredArray = [];
        lodash_1.default.forEach(streams, (item, i) => {
            refactoredArray.push(lodash_1.default.pick(item, ["uuid", "owner", "title", "description"]));
        });
        res.json(refactoredArray);
    });
}
function get(req, res) {
    console.log("get specific stream hit");
    res.json();
}
//      PROMISE METHOD
function myStreams(req, res) {
    // Stream.find is async, we need to wait before sending the response
    // Promise.all([resolve(2), resolve({}), resolve('abc')].then((response) => )
    // response => [2, {}, 'abc']
    Promise.all((req.user.streams || []).map((streamId) => Stream.find({ uuid: streamId })))
        .catch((error) => {
        res.send({ error });
    })
        .then((response = []) => {
        const streams = response.map((r) => Array.isArray(r) ? r[0] : r);
        res.send(streams);
    });
    //new Promise((resolve, reject) => {
    //  let ownedStreams: any = [];
    //  _.forEach(req.user.streams, (streamId, i) => {
    //    Stream.find({ uuid: streamId }).then((streamsFound: any) => {
    //      ownedStreams.push(streamsFound[0]);
    //      console.log("owned streams", ownedStreams);
    //     });
    //   });
    //   if (ownedStreams.length === req.user.streams.length) resolve(ownedStreams);
    // }).then((ownedStreams) => {
    //   return res.json(ownedStreams);
    // });
}
function create(req, res) {
    let uuid = uuid_1.v4();
    new Stream({
        uuid,
        owner: req.user.username,
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
    if (req.user.streams.includes(req.body.streamId)) {
        User.findOne(req.user).then((user) => {
            let updatedStreams = lodash_1.default.remove(user.streams, (id) => {
                return id !== req.body.streamId;
            });
            user.streams = updatedStreams;
            user.save();
        });
        Stream.find({ uuid: req.body.streamId }).then((stream) => {
            Stream.remove(stream[0]).then(() => res.json());
        });
    }
    else {
        res.send(401);
    }
}
