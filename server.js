const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));
server.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Plant = require("./models/plant.js");

server.listen(3005, () => {
  console.log("Listening on port 3005");
});

server.get("/", (req, res) => {
  res.render("index.ejs");
});

server.get("/plants/new", (req, res) => {
  res.render("plants/new.ejs");
});

server.post("/plants", async (req, res) => {
  const { name, description } = req.body;
  const newPlant = new Plant({
    name,
    description,
  });
  await newPlant.save();
  res.redirect("/plants/new");
});

server.get("/plants", async (req, res) => {
  const plants = await Plant.find({});
  res.render("plants/index.ejs", { plants: plants });
});

server.get("/plants/:id", async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  res.render("plants/show.ejs", { plant: plant });
});

server.get("/plants/:id/edit", async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  res.render("plants/edit.ejs", { plant: plant });
});

server.put("/plants/:id", async (req, res) => {
  const { name, description } = req.body;
  const newPlant = new Plant({
    name,
    description,
  });
  await Plant.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/plants/" + req.params.id);
});

server.delete("/plants/:id", async (req, res) => {
  await Plant.findByIdAndDelete(req.params.id);
  res.redirect("/plants");
});
