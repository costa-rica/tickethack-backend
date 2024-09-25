var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')
const CartTrip = require('../models/cartTrips')
const moment = require('moment')

router.get('/search', (req, res) => {
    console.log('- in GET /trips/search --')
    Trip.find({})
        .then(data => {

            for (let trip of data) {
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

    const dateObject = new Date(date)
    const tomorrowDateSeconds = dateObject.getTime() + 86400000;
    const tomorrowDate = new Date(tomorrowDateSeconds)

    let allTripsFormatted = []

    if (arrival, departure, dateObject) {
        Trip.find({
            // arrival: arrival,
            arrival: { $regex: new RegExp(arrival, "i") },
            departure: { $regex: new RegExp(departure, "i") },
            // date: dateIsoString
            date: { $gte: dateObject, $lte: tomorrowDate }
        }).then(data => {
            console.log("data.length: ", data.length)

            for (let trip of data) {
                // Formatter les donnees
                // trajet: "Paris > Lyon"
                // heure: "HH:MM"
                // prix: [prix] + €
                const tripTime = `${trip.date.getHours()}:${trip.date.getMinutes()}`

                console.log(`tripTime: ${tripTime}`)
                const tripObject = {
                    arrivalDeparture: `${trip.arrival} > ${trip.departure}`,
                    time: tripTime,
                    price: `${trip.price}€`,
                    tripId: trip._id
                }
                allTripsFormatted.push(tripObject)
            }
            res.json({ message: "found", tripsArray: allTripsFormatted })
        })
    } else {
        console.log(" no trip found ")
        res.json({ message: "No trip found" })
    }
});


router.post('/cart', (req, res) => {
    console.log('- dedans POST /trips/cart ')

    const tripId = req.body.tripId
    console.log(`tripID: ${tripId}`)

    if (tripId) {
        console.log(`-- dedans if --`)
        Trip.findById(tripId).then(data => {
            console.log("- dedans Trip.findById(tripId).then(data =>{");
            console.log(`data.departure: ${data.departure}`);
            console.log(`data.arrival: ${data.arrival}`);
            console.log(`data.date: ${data.departure}`);
            console.log(`data.price: ${data.price}`);

            const newCartTrip = new CartTrip({
                departure: data.departure,
                arrival: data.arrival,
                date: data.date,
                price: data.price
            })

            console.log("-  2 - dedans Trip.findById(tripId).then(data =>{");
            newCartTrip.save().then(() => {
                CartTrip.find().then(data => {
                    console.log(`CartTrip.find().then(data => {`);
                    console.log(`CartTrip data: ${data}`);
                    res.json({ result: true, tripId: tripId, data: data })
                })
            })
        })
    } else {
        console.log(`-- dedans else --`)
        res.json({ result: false, message: "Missing tripID" })
    }
})



router.delete('/cart', (req, res) => {
    console.log('- dedans DELETE /trips/cart ')

    const tripId = req.body.tripId
    console.log(`tripID: ${tripId}`)

    if (tripId) {
        console.log(`-- dedans if --`)
        CartTrip.findById(tripId).then((tripFound) => {
            if (!tripFound) {
                return res.json({ result: false, error: "User not found" })
            } else {
                CartTrip.deleteOne({ _id:tripId }).then((cartTripDeleted) => {
                    return res.json({ result: true, cartTripDeleted })
                })
            }
        })
    }

})

router.get('/cart-purchase', (req,res) => {
    console.log('- dedans GET /trips/cart-purchase ')
    // 
    const allTripsFormatted = []
    let purchaseTotal = 0
    CartTrip.find().then(data => {
        for (let trip of data) {
            // Formatter les donnees
            // trajet: "Paris > Lyon"
            // heure: "HH:MM"
            // prix: [prix] + €
            const tripTime = `${trip.date.getHours()}:${trip.date.getMinutes()}`

            console.log(`tripTime: ${tripTime}`)
            const tripObject = {
                arrivalDeparture: `${trip.arrival} > ${trip.departure}`,
                time: tripTime,
                price: `${trip.price}€`,
                tripCartId: trip._id
            }
            allTripsFormatted.push(tripObject)
            purchaseTotal += trip.price
    }
    res.json({result: true, tripsArray: allTripsFormatted, purchaseTotal})
})
})

router.get('/booking', (req,res) => {
    console.log("- in GET /trips/bookings")

    const today = new Date()

    console.log(`today: ${today}`)

    const allTripsFormatted = []
    CartTrip.find().then(data => {
        for (let trip of data) {
            console.log(`tripDate: ${trip.date}`)
            const timeDifference =  trip.date - today
            const timeDiffereneInDays = Math.round(timeDifference / (1000 * 60 * 60 * 24));
            const timeDiffereneInHours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            console.log(`timeDiffereneInDays: ${timeDiffereneInDays}`)
            console.log(`timeDiffereneInHours: ${timeDiffereneInHours}`)
            const tripTime = `${trip.date.getHours()}:${trip.date.getMinutes()}`

            console.log(`tripTime: ${tripTime}`)
            let departTimeString = `Departure in ${timeDiffereneInHours}`
            if (timeDiffereneInDays > 0 ){
                departTimeString = `Departure in ${timeDiffereneInDays} days and ${timeDiffereneInHours} hours`
            }

            const tripObject = {
                arrivalDeparture: `${trip.arrival} > ${trip.departure}`,
                time: tripTime,
                price: `${trip.price}€`,
                departTime: departTimeString
            }
            allTripsFormatted.push(tripObject)
            // purchaseTotal += trip.price
    }
    res.json({result: true, tripsArray: allTripsFormatted})
    })
})







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
        { date: { $gte: dateStart, $lte: dateEnd } }
    ).then(data => {
        console.log(data)
        res.json({ result: true, tripArrayCount: data.length })
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