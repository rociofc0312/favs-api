const mongoose = require("mongoose");

let connection;
async function connectDB() {
  if (connection) return;
  const uri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  connection = mongoose.connection;

  connection.once("open", () =>
    console.log("Connection established successfully")
  );
  connection.on("disconnected", () => console.log("Successfully disconnected"));
  connection.on("error", (err) => console.log("Something went wrong!", err));

  await mongoose.connect(uri, options);
}

async function disconnectDB() {
  if (!connection) return;

  await mongoose.disconnect();
}

async function cleanupDB() {
  if (connection) {
    const promises = [];

    for (const collection in connection.collections) {
      promises.push(connection.collections[collection].deleteMany({}));
    }

    await Promise.all(promises);
  }
}

module.exports = {
  connectDB,
  disconnectDB,
  cleanupDB,
};
