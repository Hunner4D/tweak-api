module.exports = {
  create
}

function create(req: Request, res: Response) {
  let fullRequest = req.body
  console.log(fullRequest);
  res.json();
};

