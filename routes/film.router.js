const { Router } = require("express");
const filmSchema = require("./validations/film.scema");
const checkDirectorHeader = require("./middlewares/checkDirectorHeader");






const filmRouter = Router()




filmRouter.post("/", checkDirectorHeader, async (req, res) => {
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
  

  filmRouter.get("/", async (req, res) => {
    try {
      const { genre, year, rating } = req.query;
  
      const filter = {};
      if (genre) filter.genre = genre;
      if (year) filter.releaseYear = year;
      if (rating) filter.rating = rating;
  
      const films = await filmModel.find(filter);
  
      if (!films.length) {
        return res.status(404).json({ message: "No match" });
      }
  
      res.json(films);
    } catch (err) {
      res.status(500).json({ message: "error", error: err.message });
    }
  });
  
  filmRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid film ID" });
    }
  
    const updated = await filmModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Film updated", film });
  });
  
  filmRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid film ID" });
    }
  
    const deleted = await filmModel.findByIdAndDelete(id);
    res.json({ message: "Film deleted", film });
  });
  


  module.exports = filmRouter