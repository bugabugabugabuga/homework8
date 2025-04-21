const express = require("express");
const connectToDb = require("./db/db");
const directorModel = require("./models/director.model");
const filmModel = require("./models/film.model");
const { isValidObjectId } = require("mongoose");
const directorSchema = require("./validations/director.scema");
const filmSchema = require("./validations/film.scema");
const checkDirectorHeader = require("./middlewares/checkDirectorHeader");

const app = express();
connectToDb();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello");
});


app.post("/directors", async (req, res) => {
  const { fullname, age } = req.body;
  if (!fullname) return res.status(400).json({ message: "fullname required" });

  const { error } = directorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }


  const director = await directorModel.create({ fullname, age });
  res.status(201).json({ message: "Director created", director });
});


app.get("/directors", async (req, res) => {
  const directors = await directorModel.find().populate("films");
  res.json(directors);
});

app.put("/directors/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid  ID" });
    }
  
    const updated = await directorModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: " updated", updated });
  });

  app.delete("/directors/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  
    const director = await directorModel.findByIdAndDelete(id);
    if (!director) {
      return res.status(404).json({ message: " not found" });
    }
  
    await filmModel.deleteMany({ director: id });
  
    res.json({ message: "Director and their films deleted" });
  });
  

  app.post("/films", checkDirectorHeader, async (req, res) => {
    const directorId = req.headers["director-id"];
    if (!directorId || !isValidObjectId(directorId)) {
      return res.status(400).json({ message: "Director ID is required" });
    }
  
    const { error } = filmSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { title, genre, releaseYear } = req.body; 
    if (!title) return res.status(400).json({ message: "Title is required" });
  
    const film = await filmModel.create({ title, rating, description, genre, releaseYear, director: directorId });
  
    await directorModel.findByIdAndUpdate(directorId, { $push: { films: film._id } });

  
    res.status(201).json({ message: "Film created", film });
  });
  

  app.get("/films", async (req, res) => {
    try {
      const { genre, year, rating } = req.query;
  
      const filter = {};
      if (genre) filter.genre = genre;
      if (year) filter.releaseYear = year;
      if (rating) filter.rating = rating;//damateba
  
      const films = await filmModel.find(filter);
  
      if (!films.length) {
        return res.status(404).json({ message: "No match" });
      }
  
      res.json(films);
    } catch (err) {
      res.status(500).json({ message: "error", error: err.message });
    }
  });
  
app.put("/films/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid film ID" });
    }
  
    const updated = await filmModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Film updated", film });
  });
  
app.delete("/films/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid film ID" });
    }
  
    const deleted = await filmModel.findByIdAndDelete(id);
    res.json({ message: "Film deleted", film });
  });
  

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
