const Express = require("express");
const app = Express();
const PORT = 5465;

// Base configurations
app.use(Express.json());

// Middlewares
const { requestLogger, requestTracer } = require("./middlewares");
app.use(requestLogger);
app.use(requestTracer);

// App Routes
const { patientRoutes } = require("./src");
app.use("/patients", patientRoutes);

app.get("*", (req, res) => {
  return res.send(
    "Hey young explorer, are you lost? Nothing is available at this path."
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
