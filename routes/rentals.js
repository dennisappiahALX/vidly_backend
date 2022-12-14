const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();


router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


router.post('/', auth, async(req, res) => {
    const {error} = validate(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    const rental = new Rental( {
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }});
        
        try {
            const session = await mongoose.startSession();
            await session.withTransaction(async () => {
            await rental.save();
            movie.numberInStock--;
            movie.save();
            res.send(rental);

            });
      
            session.endSession();
            console.log('success');
          } 
          catch (error) {
            console.log('error111', error.message);
          }
});


router.get('/:id', validateObjectId, async(req, res) => {
    const rental= await Rental.findById(req.params.id)
    if (!rental) return res.status(404).send('The rental with the given ID was not found!');

    res.send(rental);
 });

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    const rental = await Rental.findByIdAndUpdate(req.params.id,{
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    } 
    , { new : true })
        
    if (!rental) return res.status(404).send('The rental with the given ID was not found!');
    
    res.send(rental); 

});

router.delete('/:id', async(req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id)
    
    if (!rental) return res.status(404).send('The rental with the given ID was not found!');
    
    res.send(rental);

});

 module.exports = router;