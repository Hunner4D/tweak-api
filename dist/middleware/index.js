"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruh = void 0;
const constants_1 = require("../utils/constants");
module.exports = {
    auth,
    checkMethod
};
function auth(req, res, next) {
    next();
    return;
}
function checkMethod(req, res, next) {
    const { method } = req;
    if (!constants_1.WHITE_LISTED_METHODS.includes(method)) {
        // cant hit this ish
        return res.send(401);
    }
    next();
}
exports.bruh = () => 2;
