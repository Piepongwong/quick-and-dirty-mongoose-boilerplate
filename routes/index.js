const express = require("express")
const app = express()
const Restaurant = require("../models/restaurant")

app.get("/", (req, res)=> {
    let searchQuery = req.query.search
    Restaurant.find({}, (err, result)=> {
        res.render("index", {restaurants: result})
    })
})

module.exports = app