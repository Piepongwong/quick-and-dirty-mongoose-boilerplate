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

app.get("/customers", (req, res)=> {
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

app.post("/customer", (req, res)=> {

    let restaurantIds = req.body.restaurants.map((id)=> {
        return mongoose.Types.ObjectId(id)
    })
    let newCustomer = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        restaurants: restaurantIds
    }

    Customer.create(newCustomer, (err)=> {
        res.redirect("/")
    })
})

app.get("/customer/update", (req, res)=> {
    let customerId = req.query.customerId
    customerId = mongoose.Types.ObjectId(customerId)

    Customer.findOne({_id: customerId})
        .populate("restaurants")
        .then((customer)=> {
            let restaurantIds = customer.restaurants.map((restaurant)=> restaurant._id)    
            
            Restaurant.find({_id: {$nin: restaurantIds}})
                .then((restaurants)=> {

                    res.render("updateCustomer", {
                        visitedRestaurants: customer.restaurants,
                        customer: customer,
                        unvisitedRestaurants: restaurants
                    })

                })
        })
})

app.post("/customer/update", (req, res)=> {

    let restaurantIds = req.body.restaurants.map((id)=> {
        return mongoose.Types.ObjectId(id)
    })
    let newCustomer = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        restaurants: restaurantIds
    }

    Customer.create(newCustomer, (err)=> {
        res.redirect("/")
    })
})

module.exports = app