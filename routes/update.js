const express = require("express")
const app = express()
const Restaurant = require("../models/restaurant")
const mongoose = require("mongoose")

app.post("/update", (req,res)=> {
    debugger
    let updateValues = {
        name: req.body.name,
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        capacity: req.body.capacity || "Unknown"
    }
    let objectId =mongoose.Types.ObjectId(req.body.id)
    Restaurant.updateOne({_id: objectId}, updateValues, (err)=> {
        if(err) res.status(500).send("An error has occured, so sorry")
        else res.send("ok")
    })
})

module.exports = app