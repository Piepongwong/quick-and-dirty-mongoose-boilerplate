const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    first_name: String,
    last_name: String,
    restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: "restaurants"}]
})

module.exports = mongoose.model("customers", CustomerSchema)