const user = require("./api/user");

function routes(app) {
  app.use("/auth", user);
}

module.exports = routes;
