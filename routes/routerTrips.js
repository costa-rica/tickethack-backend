var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

router.get('/search',(req,res) =>{
    // code
    console.log('- in /search --')


    Trip.find().then(data =>{
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
// });


module.exports = router;