const User = require('../models/user')
import { v4 as uuidv4 } from "uuid";

module.exports = {
  signIn
}

function signIn(req: Request, res: Response) {
  let query = { ...req.body  };
  console.log("sign in query: ", query);

  res.json();
};

