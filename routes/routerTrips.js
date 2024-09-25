var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')
const moment = require('moment')

router.get('/search', (req, res) => {
    console.log('- in GET /trips/search --')
    Trip.find({})
        .then(data => {
            
            for (let trip of data){
                console.log(`trip date: ${trip.date}`)
                // console.log(`trip date: ${trip.date}`)
            }
            console.log("data.length: ", data.length)
            return res.json({ tripsArray: data, length: data.length })
        })
});



// Buton "Search"
router.post('/search', (req, res) => {
    console.log("- in POST /trips/search")

    const arrival = req.body.arrival
    const departure = req.body.departure
    const date = req.body.date

    const dateObject =  new Date(date)
    const tomorrowDateSeconds = dateObject.getTime() + 86400000;
    const tomorrowDate = new Date(tomorrowDateSeconds)

    let allTripsFormatted = []

    if (arrival, departure, dateObject){
        Trip.find({
            arrival: arrival,
            departure: departure,
            // date: dateIsoString
            date: {$gte: dateObject, $lte: tomorrowDate}
        }).then(data => {
            console.log("data.length: ", data.length)

            for (let trip of data){
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










// Buton "Search"
router.post('/search2', (req, res) => {
    console.log("- in POST /trips/search2")
  
    const arrival = req.body.arrival
    const departure = req.body.departure
    const date = req.body.date

    const dateStart = new Date("2024-09-25")
    const dateEnd = new Date("2024-09-26")

    console.log(`dateStart: ${dateStart}`)
    console.log(`dateStart: ${typeof dateStart}`)
    console.log(`dateEnd: ${dateEnd}`)
    console.log(`dateEnd: ${typeof dateEnd}`)
    console.log(`dateStart < dateEnd: ${dateStart < dateEnd}`)

    Trip.find(
        // {date:{$lte: dateEnd}}
        {date: {$gte: dateStart, $lte: dateEnd}}
    ).then(data => {
        console.log(data)
        res.json({result: true, tripArrayCount: data.length})
    })

})


// router.get('/myCart',(req,res) =>{
//     // code


//     res.json({bookedTrips: arrayTrips});
// });


// router.get('/myBookings',(req,res) =>{
//     // code


//     res.json({bookedTrips: arrayTrips});
// }); //


module.exports = router;