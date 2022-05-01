const user = require("./api/user");
const favList = require("./api/fav-list");

function routes(app) {
  app.use("/auth", user);
  app.use("/api/favs", favList);
}

module.exports = routes;
