const express = require("express")
const app = express()
const Restaurant = require("../models/restaurant")

app.get("/restaurant", (req, res)=> {
    res.render("addRestaurant")
})

app.post("/restaurant", (req, res)=> {

    let newRestaurant = {
        name: req.body.name,
        borough: req.body.borough,
        cuisine: req.body.cuisine
    }

    Restaurant.create(newRestaurant, (err)=> {
        if(err) res.send("ERROR")
        else res.redirect(`/?search=${req.body.cuisine}`)
    })
})

module.exports = app