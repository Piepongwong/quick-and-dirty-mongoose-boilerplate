const express = require("express")
const app = express()
const User = require("../models/user")
const mongoose = require("mongoose")

app.get("/user/signup", (req, res)=> {
    res.render("signup")
})

app.post("/user/signup", (req, res)=> {
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0) {
                res.send("user already exists")
            } else {
                User.create(newUser)
                .then((user)=> {
                    res.send("ok")
                })
            }
        })
        .catch((err)=> {
            res.status(500).send("An error occured")
        })

})

app.get("/user/login", (req, res)=> {
    res.render("login")
})

app.get("/user/logout", (req, res)=> {
    res.clearCookie("loggedIn")
    res.redirect("/user/login")
})

app.post("/user/login", (req, res)=> {
    debugger
    User.find({username: req.body.username})
        .then((user)=> {
            if(user.length > 0 && user[0].password === req.body.password) {
                res.cookie("loggedIn", true)
                res.send("logged in")
            } else {
                res.send("Invalid credentials")
            }
        })
        .catch((err)=> {
            res.status(500).send("an error occured")
        })
})
module.exports = app