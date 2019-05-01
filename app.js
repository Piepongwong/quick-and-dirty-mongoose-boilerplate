const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hbs = require('hbs');
 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/michelin', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected")
    else console.log("ERROR ERROR ERROR", err)
})

const restaurantSchema = new Schema({
    borough: { type: String },
    cuisine: { type: String },
    name: {type: String }
  })

const Restaurant = mongoose.model('restaurants', restaurantSchema);

app.get("/", (req, res)=> {
    Restaurant.find({}, (err, result)=> {
        console.log("CHECK", result)
        res.render("index", {restaurants: result})
    })
})

app.listen(3000, ()=> {
    console.log("Listening!!!!!")
})