import { NextFunction, Request, Response } from "express";
import axios from "axios";
import _ from "lodash";
const config = require("../config/rtmpServer");
const Stream = require("../models/streams");

module.exports = {
  getAll,
};

function getAll(req: Request, res: Response) {
  axios
    .get("http://127.0.0.1:" + config.rtmp_server.http.port + "/api/streams")
    .then((response) => {
      let streamsCompiled = response.data;
      let streamKeys = [];
      if (typeof (streamsCompiled["live"] !== "undefined")) {
        let streams = streamsCompiled["live"];
        for (let stream in streams) {
          streamKeys.push(stream);
        }
        Promise.all(
          streamKeys.map((streamKey) => Stream.find({ stream_key: streamKey }))
        ).then((response: any) => {
          let refactoredStreams: any = [];
          const streams = response.map((r: any) =>
            Array.isArray(r) ? r[0] : r
          );

          _.forEach(streams, (item, i) => {
            refactoredStreams.push(
              _.pick(item, ["uuid", "owner", "title", "description"])
            );
          });
          console.log(refactoredStreams)
          res.json(refactoredStreams)
        });
      }
    });
}

// Promise.all((req.user.streams || []).map((streamId) => Stream.find({ uuid: streamId })))
//         .catch((error) => {
//         res.send({ error });
//     })
//         .then((response = []) => {
//         const streams = response.map((r) => (Array.isArray(r) ? r[0] : r));
//         res.send(streams);
//     });
