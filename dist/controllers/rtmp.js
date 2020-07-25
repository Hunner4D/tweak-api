"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const config = require("../config/rtmpServer");
const Stream = require("../models/streams");
module.exports = {
    getAll,
    getOne,
};
function getAll(req, res) {
    axios_1.default
        .get("http://127.0.0.1:" + config.rtmp_server.http.port + "/api/streams")
        .then((response) => {
        let streamsCompiled = response.data;
        let streamKeys = [];
        if (typeof (streamsCompiled["live"] !== "undefined")) {
            let streams = streamsCompiled["live"];
            for (let stream in streams) {
                streamKeys.push(stream);
            }
            Promise.all(streamKeys.map((streamKey) => Stream.find({ stream_key: streamKey }))).then((response) => {
                let refactoredStreams = [];
                const streams = response.map((r) => Array.isArray(r) ? r[0] : r);
                lodash_1.default.forEach(streams, (item, i) => {
                    refactoredStreams.push(lodash_1.default.pick(item, ["uuid", "owner", "title", "description"]));
                });
                res.json(refactoredStreams);
            });
        }
    });
}
function getOne(req, res) {
    Stream.findOne({ uuid: req.params.streamId }).then((stream) => {
        let videoJsOptions = {
            autoplay: true,
            liveui: true,
            controls: true,
            sources: [
                {
                    src: "http://127.0.0.1:" +
                        config.rtmp_server.http.port +
                        "/api/streams/live/" +
                        stream.stream_key,
                    type: "application/x-mpegURL",
                },
            ],
            fluid: true,
        };
        res.json(videoJsOptions);
    });
}
