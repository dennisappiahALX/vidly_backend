const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('app', { title: 'Vidly', message: 'Hello!'});
});


module.exports = router;