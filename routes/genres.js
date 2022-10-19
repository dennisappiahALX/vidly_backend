const express = require('express');
const router = express.Router();


let genres = [
    {id : 1, name : 'hiphop'},
    {id : 2, name : 'RnB'},
    {id : 3, name : 'AfroBeat'},
    {id : 3, name : 'Gospel'}
];


router.get('/', (req,res) => {
    res.send(genres);
});


router.get('/:id', (req, res) => {
    const genre =  genres.find( gnre => gnre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found!');
    res.send(genre);
 });

router.post('/', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const new_genre = {
        id : genres.length + 1,
        name: req.body.name 
    };
    genres.push(new_genre);

    res.send(new_genre);
});


router.put('/:id', (req, res) => {

    const genre =  genres.find( crse => crse.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found!');
    
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name; 
    res.send(genre); 

});

function validateGenre(genre){
    const schema = Joi.object({ name: Joi.string().min(3) .required() });
    
    return schema.validate(genre);
}


router.delete('/:id', (req, res) => {
    const genre =  genres.find( crse => crse.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found!');
    
    const index = genres.indexOf(genre); 
    genres.splice(index, 1);

    res.send(genre);

});


 module.exports = router;