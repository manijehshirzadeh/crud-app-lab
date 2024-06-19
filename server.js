const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const server = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

server.get("/test", async (req, res) => {
  res.render("test.ejs");
});

server.listen(3005, () => {
  console.log("Listening on port 3005");
});
