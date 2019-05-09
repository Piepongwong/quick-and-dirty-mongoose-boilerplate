const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const hbs = require('hbs');
const cookieParser = require('cookie-parser')

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

app.use(cookieParser("super secret")) // for signed cookies

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/michelin', {useNewUrlParser: true}, (err)=> {
    if(!err)console.log("connected")
    else console.log("ERROR ERROR ERROR", err)
})

app.use("/", attachUserInfo, require("./routes/index"))
app.use("/", attachUserInfo, require("./routes/user"))
app.use("/", attachUserInfo, require("./routes/detail"))
app.use("/", attachUserInfo, authenticateWithSession, require("./routes/restaurant"))
app.use("/", attachUserInfo, require("./routes/update"))
app.use("/", attachUserInfo, require("./routes/delete"))
app.use("/", attachUserInfo, require("./routes/customer"))

function authenticate(req, res, next) {
    if(req.signedCookies.loggedIn === "true") next()
    else res.send("bugger of")
}

function authenticateWithSession(req, res, next) {
    if(req.session.currentUser)  next()
    else res.send("bugger of")
}

function attachUserInfo(req, res, next) {
    res.locals.currentUser = req.session.currentUser
    next()
}

app.listen(3001, ()=> {
    console.log("Listening!!!!!")
})