const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        genre: { type: String, require: true },
        mood: { type: String, require: true },
        image: { type: String, require: true },
        rating: { type: Number, require: true },
        duration: { type: Number, require: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
module.exports = mongoose.model("movie", movieSchema);
// schema for movie data