const mongoose = require('mongoose');

const cartTripSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
});

const CartTrip = mongoose.model('cartTrips', cartTripSchema);

module.exports = CartTrip;