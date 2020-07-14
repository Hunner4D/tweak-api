import { NextFunction } from "express"

module.exports = {
    auth
}

function auth(req: Request, res: Response, next: NextFunction) {
    next();
    return;
}