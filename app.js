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

app.use("/user", require("./routes/index"))
app.use("/", require("./routes/detail"))
app.use("/", require("./routes/restaurant"))
app.use("/", require("./routes/update"))
app.use("/", require("./routes/delete"))

app.listen(3000, ()=> {
    console.log("Listening!!!!!")
})