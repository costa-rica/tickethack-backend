var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')


router.get('/search', (req, res) => {
    // code
    console.log('- in /search --')
    Trip.find({})
        .then(data => {
            res.json({ allTrips: data })
        })
    // res.json({allTrips: true});
});

// Buton "Search"
router.post('/search', (req, res) => {
    console.log("- in POST /search")

    const arrival = req.body.arrival
    const departure = req.body.departure
    const date = req.body.date
    
    let allTripsFormatted = []

    if (arrival, departure, date){
        console.log('- in /search --')
        Trip.find({
            arrival: arrival,
            departure: departure,
            date: date
        }).then(data => {
                res.json({ message: "found",allTrips: data })

                


            })
    } else {
        console.log(" no trip found ")
        res.json({message: "No trip found"})
    }

});

// router.get('/myCart',(req,res) =>{
//     // code


//     res.json({bookedTrips: arrayTrips});
// });


// router.get('/myBookings',(req,res) =>{
//     // code


//     res.json({bookedTrips: arrayTrips});
// }); //


module.exports = router;