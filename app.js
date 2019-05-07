const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hbs = require('hbs');
const cookieParser = require('cookie-parser')

app.use(cookieParser("super secret")) // for signed cookies

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/michelin', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected")
    else console.log("ERROR ERROR ERROR", err)
})

app.use("/", require("./routes/index"))
app.use("/", require("./routes/user"))
app.use("/", require("./routes/detail"))
app.use("/", require("./routes/restaurant"))
app.use("/", require("./routes/update"))
app.use("/", require("./routes/delete"))
app.use("/", require("./routes/customer"))

function authenticate(req, res, next) {
    if(req.signedCookies.loggedIn === "true") next()
    else res.send("bugger of")
}

app.listen(3001, ()=> {
    console.log("Listening!!!!!")
})