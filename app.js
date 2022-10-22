const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDb...!'))
    .catch(err => console.error('Could not connect to MongoDb', err));

app.use(express.json());
app.use(express.urlencoded({ extended : true })); 
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);


console.log(`Application Name: ${config.get('name')}`);
console.log(`Application Name: ${config.get('mail.host')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}
app.use(logger);


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));