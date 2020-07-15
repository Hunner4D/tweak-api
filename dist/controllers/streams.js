"use strict";
const Stream = require('../models/streams');
module.exports = {
    create
};
function create(req, res) {
    let query = Object.assign({}, req.body);
    console.log("create stream query:", query);
    res.json();
}
;
