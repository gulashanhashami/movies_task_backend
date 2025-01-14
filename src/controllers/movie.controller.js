const express = require("express");
const Movie = require("../models/movie.model")
const router = express.Router();

// insert movie data
router.post("", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).send(movie);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//get the movie data
router.get("", async (req, res) => {
    try {
        const { duration } = req.query;
        if (duration === "short") {
            req.query = { ...req.query, duration: { 'lt': '90' } };
        }
        if (duration === "medium") {
            req.query = { ...req.query, duration: { 'gte': '90', 'lte': '120' } };
        }
        if (duration === "long") {
            req.query = { ...req.query, duration: { 'gt': '120' } };
        }
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        const movies = await Movie.find(JSON.parse(queryStr)).lean().exec();

        return res.status(200).send({ movies });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;
// controller for movie data