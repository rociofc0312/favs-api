require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/database");
const expressConfig = require("./config/express");
const routes = require("./routes");

// Express server
const app = express();
expressConfig(app);
routes(app);

const port = process.env.PORT || 8080;
connectDB();

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = { app };
