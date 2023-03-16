const uuid = require("uuid");

function addRequestTracer(_, res, next) {
  res.requestId = uuid.v4();
  next();
}

module.exports = addRequestTracer;
