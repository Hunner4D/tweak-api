declare namespace Express {
    interface Request {
        user: Object,
    }
    interface Object {
        username: String,
        streams: Array<String>
    }
}