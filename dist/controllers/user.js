"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
module.exports = {
    signIn
};
function signIn(req, res) {
    let query = Object.assign({}, req.body);
    console.log("sign in query: ", query);
    res.json();
}
;
