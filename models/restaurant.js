const mongoose = require("mongoose")
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    borough: { type: String },
    cuisine: { type: String },
    name: {type: String },
    capacity: {type: String}
  })

const Restaurant = mongoose.model('restaurants', restaurantSchema);

module.exports = Restaurant