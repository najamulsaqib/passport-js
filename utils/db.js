const mongoose = require("mongoose");
const mongo_uri = "mongodb://localhost:27017/passport";

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("Connected to MongoDB :)"));

module.exports = {
  User: require("../models/user.js"),
};
