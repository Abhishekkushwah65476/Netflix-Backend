const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema({


    Name: { type: String },
    Movies: { type: [mongoose.Schema.Types.ObjectId] },

},{ timestamp: true })

module.exports =mongoose.model("Genre", genreSchema)