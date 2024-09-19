const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/socialnetwork",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = db;