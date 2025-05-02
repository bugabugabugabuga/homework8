const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const directorSchema = require("../validations/director.scema");
const Director = require("../models/director.model");
const isAuth = require("../middlewares/isAuth");
require("dotenv").config();

const routerAuth = Router();

routerAuth.post("/sign-up", async (req, res) => {
  const { error } = directorSchema.validate(req.body || {});
  if (error) return res.status(400).json(error);

  const { fullname, middlename, email, password, age } = req.body;

  const existingDirector = await Director.findOne({ email });
  if (existingDirector) {
    return res.status(400).json({ message: "Director already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Director.create({
    fullname,
    middlename,
    email,
    password: hashedPassword,
    age
  });

  res.status(201).json({ message: "Director created successfully" });
});

routerAuth.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const director = await Director.findOne({ email }).select("password");
  if (!director) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, director.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ directorId: director._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

routerAuth.get("/current-director", isAuth, async (req, res) => {
  const director = await Director.findById(req.directorId);
  res.json(director);
});

module.exports = routerAuth;
