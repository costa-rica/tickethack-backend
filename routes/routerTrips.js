var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')
const moment = require('moment')

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

    console.log(`date: ${date}`)
    console.log(`date typeof: ${typeof date}`)


    // const date = moment(req.body.date).format("YYYY-MM-DD")
    // const date = Date.parse(req.body.date)// YYYY-MM-DD
    const dateFormatted = new Date(req.body.date).toISOString().split('T')[0]// YYYY-MM-DD

    const dateObject =  new Date(dateFormatted)

    console.log("dateObject: " + dateObject)
    console.log(`dateObject: ${typeof dateObject}`)

    const momentDate = moment([dateFormatted]).format("YYYY-MM-DD HH:MM:SS")

    console.log("moment dateObject: " + momentDate)
    console.log(`momentDate: ${typeof momentDate}`)
    
    const dateIsoString = dateObject.toISOString()
    
    console.log("dateIsoString: " + dateIsoString)
    console.log(`dateIsoString: ${typeof dateIsoString}`)

    let allTripsFormatted = []

    if (arrival, departure, dateIsoString){
        Trip.find({
            arrival: arrival,
            departure: departure,
            date: dateIsoString
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