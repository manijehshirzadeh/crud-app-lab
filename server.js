const express = require("express");

const server = express();

server.get("/", async (req, res) => {
  res.send("hello, friend!");
});

server.get("/test", async (req, res) => {
  res.render("test.ejs");
});

server.listen(3005, () => {
  console.log("Listening on port 3005");
});
