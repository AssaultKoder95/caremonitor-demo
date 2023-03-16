function requestLogger(req, _, next) {
  console.table([
    {
      method: req.method,
      query: req.query,
      params: req.params,
      url: req.url,
    },
  ]);

  next();
}

module.exports = requestLogger;
