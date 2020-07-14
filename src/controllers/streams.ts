const Stream = require('../models/streams')

module.exports = {
  create
}

function create(req: Request, res: Response) {
  let query = { ...req.body  };
  console.log(query);

  res.json();
};

