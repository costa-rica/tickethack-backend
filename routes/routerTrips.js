var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')


router.get('/search',(req,res) =>{
    // code
    console.log('- in /search --')
    Trip.find({})
    .then(data =>{
        res.json({allTrips: data})
    })
    // res.json({allTrips: true});
});

router.post('/search',(req,res) =>{
    
    console.log("- in POST /search")
    
    // const { arrival, departure, date } = req.body

    const arrival = req.body.arrival
    const departure = req.body.departure
    const date = req.body.date
    
    console.log(``)
    // code
    console.log('- in /search --')
    Trip.find({})
    .then(data =>{
        res.json({allTrips: data})
    })
    // res.json({allTrips: true});
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