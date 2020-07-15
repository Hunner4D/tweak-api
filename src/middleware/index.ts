import { NextFunction, Request, Response } from "express";
import { WHITE_LISTED_METHODS } from '../utils/constants';


module.exports = {
    auth,
    checkMethod
}

function auth(req: Request, res: Response, next: NextFunction) {
    next();
}

function checkMethod(req: Request, res: Response, next: NextFunction) {
    const { method } = req;
    if (!WHITE_LISTED_METHODS.includes(method)) {
        // cant hit this ish
        return res.send(401);
    }
    next();
}

export const bruh = () => 2;