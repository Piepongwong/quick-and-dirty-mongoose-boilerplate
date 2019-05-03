const express = require("express")
const app = express()
const Restaurant = require("../models/restaurant")
const mongoose = require("mongoose")

app.get("/delete", (req, res)=> {
    let objectId = mongoose.Types.ObjectId(req.query.id)
    Restaurant.deleteOne({_id: objectId}, (err)=> {
        if(err) res.status(500).send("Restaurant was not deleted. Error.")
        else res.redirect("/")
    })
})

module.exports = app