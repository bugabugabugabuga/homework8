const { default: mongoose } = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "director",
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {//damateba
    type: String,
    default: "",
  },
  rating: { //damateba
    type: Number,
    required: true,
    default: 0,
  }

});

module.exports = mongoose.model("film", filmSchema);
