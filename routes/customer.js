const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Customer = require("../models/customers")
const Restaurant = require("../models/restaurant")

app.get("/customer", (req, res)=> {
    Restaurant.find({}, (err, result)=> {
        res.render("addCustomer", {restaurants: result})
    })
})

app.post("/customer", (req, res)=> {

    if(Array.isArray(req.body.restaurants)) {
        var restaurantIds = req.body.restaurants.map((id)=> {
            return mongoose.Types.ObjectId(id)
        })
    } else {
        var restaurantIds = [mongoose.Types.ObjectId(req.body.restaurants)]
    }

    let newCustomer = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        restaurants: restaurantIds
    }

    Customer.create(newCustomer, (err)=> {
        res.redirect("/")
    })
})

app.get("/customer/list", (req, res)=> {
    Customer
        .find({})
        .populate("restaurants")
        .then((result)=> {
            res.render("listCustomers", {customers: result})
        })
        .catch((err)=> {
            res.send("ERROR")
        })
})



module.exports = app