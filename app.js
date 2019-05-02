const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hbs = require('hbs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/michelin', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected")
    else console.log("ERROR ERROR ERROR", err)
})

const restaurantSchema = new Schema({
    borough: { type: String },
    cuisine: { type: String },
    name: {type: String },
    capacity: {type: String}
  })

const Restaurant = mongoose.model('restaurants', restaurantSchema);

app.get("/", (req, res)=> {
    debugger
    let searchQuery = req.query.search
    console.log(searchQuery)
    Restaurant.find({cuisine: searchQuery}, (err, result)=> {
        res.render("index", {restaurants: result})
    })
})

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
app.get("/restaurant", (req, res)=> {
    res.render("addRestaurant")
})

app.post("/restaurant", (req, res)=> {

    let newRestaurant = {
        name: req.body.name,
        borough: req.body.borough,
        cuisine: req.body.cuisine
    }
    console.log(newRestaurant)
    Restaurant.create(newRestaurant, (err)=> {
        if(err) res.send("ERROR")
        else res.redirect(`/?search=${req.body.cuisine}`)
    })
})

app.listen(3000, ()=> {
    console.log("Listening!!!!!")
})