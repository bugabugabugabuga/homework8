const directorModel = require("./models/director.model");
const filmModel = require("./models/film.model");
const { isValidObjectId } = require("mongoose");
const directorSchema = require("./validations/director.scema");
const { Router } = require("express");



const directorrouter = Router()



directorrouter.post("/", async (req, res) => {
    const { fullname, age } = req.body;
    if (!fullname) return res.status(400).json({ message: "fullname required" });
  
    const { error } = directorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
  
    const director = await directorModel.create({ fullname, age });
    res.status(201).json({ message: "Director created", director });
  });
  
  
  directorrouter.get("/", async (req, res) => {
    const directors = await directorModel.find().populate("films");
    res.json(directors);
  });
  
  directorrouter.put("/:id", async (req, res) => {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid  ID" });
      }
    
      const updated = await directorModel.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ message: " updated", updated });
    });
  
    directorrouter.delete("/:id", async (req, res) => {
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
    

    module.exports = directorrouter