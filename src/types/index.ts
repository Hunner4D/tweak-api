declare namespace Express {
    interface Request {
        user: Object,
    }
    interface Object {
        userId: String,
    }
}