var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')


router.get('/search', (req, res) => {
    console.log('- in GET /trips/search --')
    Trip.find({})
        .then(data => {
            return res.json({ tripsArray: data })
        })
});

// Buton "Search"
router.post('/search', (req, res) => {
    console.log("- in POST /trips/search")

    const arrival = req.body.arrival
    const departure = req.body.departure
    const date = req.body.date
    
    let allTripsFormatted = []

    if (arrival, departure, date){
        Trip.find({
            arrival: arrival,
            departure: departure,
            date: date
        }).then(data => {

            for (let trip of data){
                console.log(`trip.date: ${trip.date}`)
                console.log(`trip.date: ${trip.date.getHours()}`)
                console.log(`trip.date: ${trip.date.getMinutes()}`)
            // Formatter les donnees
            // trajet: "Paris > Lyon"
            // heure: "HH:MM"
            // prix: [prix] + €
                const tripTime = `${trip.date.getHours()}:${trip.date.getMinutes()}`

                console.log(`tripTime: ${tripTime}`)
                const tripObject ={
                    arrivalDeparture: `${trip.arrival} > ${trip.departure}`,
                    time: tripTime,
                    price: `${trip.price}€`
                }

                allTripsFormatted.push(tripObject)

            }



            res.json({ message: "found",tripsArray: allTripsFormatted })
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