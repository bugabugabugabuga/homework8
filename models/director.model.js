const { default: mongoose,  } = require("mongoose");

const directorSchema = new mongoose.Schema({
    fullname: {
        type: String, require: true
    },
    age: {
        type: Number
    },
    films: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "film",
        default: []
    }
})


module.exports = mongoose.model("director", directorSchema)