const Streams = require("./models/streams");

const NodeMediaServer = require('node-media-server'),
    config = require('./config/rtmpServer').rtmp_server;

nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    Streams.findOne({stream_key: stream_key}, (err, stream) => {
        if (!err) {
            if (!stream) {
                let session = nms.getSession(id);
                session.reject();
            } else {
                // do stuff
            }
        }
    });
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};


module.exports = nms;