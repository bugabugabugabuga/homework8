const { default: mongoose,  } = require("mongoose");

const directorSchema = new mongoose.Schema({
    fullname: {
        type: String, require: true
    },
    middlename: {
        type: String
    },
    age: {
        type: Number
    },
    films: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "film",
    }, 
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true
     },
})


module.exports = mongoose.model("director", directorSchema)