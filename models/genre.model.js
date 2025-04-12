const { default: mongoose,  } = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: {
        type: String, require: true, 
    },
    films: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "film",
     
    }
})


module.exports = mongoose.model("genre", genreSchema)