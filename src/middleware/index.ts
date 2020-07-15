import { NextFunction, Request, Response } from "express";
import { WHITE_LISTED_METHODS } from '../utils/constants';


module.exports = {
    auth,
    checkPost,
    checkReferer
}

function auth(req: Request, res: Response, next: NextFunction) {
    next();
}

function checkPost(req: Request, res: Response, next: NextFunction) {
    const { method } = req;
    // console.log(req)
    if (!["POST"].includes(method)) {
        return res.send(401);
    }
    next();
}

function checkReferer(req: Request, res: Response, next: NextFunction) {
    const referer = req.headers.referer;
    // console.log(referer);
    if (!referer || !referer.includes("http://localhost:3000")) {
        return res.send(401);
    }
    next();
}

export const bruh = () => 2;