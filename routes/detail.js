const express = require("express")
const app = express()
const Restaurant = require("../models/restaurant")
const mongoose = require("mongoose")

app.get("/detail", (req, res)=> {
    
    var objectId = mongoose.Types.ObjectId(req.query.id);
    console.log(req.query.id)
    Restaurant.find({_id: objectId}, (err, result)=> {
        console.log(result)
        if(!result[0].capacity) {
            result[0].capacity = "Not available"
        }
        res.render("detail", {restaurant: result[0]})
    })
})

module.exports = app