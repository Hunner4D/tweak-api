"use strict";
const Streams = require('../models/streams');
module.exports = {
    create
};
function create(req, res) {
    let fullRequest = req.body;
    console.log(fullRequest);
    res.json();
}
;
