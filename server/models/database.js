// To handle database connection

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const URI = process.env.MONGODB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function () {
  console.log("Connected");
});
