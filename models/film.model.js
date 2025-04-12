const { default: mongoose,  } = require("mongoose");

const filmSchema = new mongoose.Schema({
    title: {
        type: String, require: true
    },
    releaseYear: {
        type: Number
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "director",
        required: true
      
    },
    gernes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gerne",
    }
})


module.exports = mongoose.model("film", filmSchema)