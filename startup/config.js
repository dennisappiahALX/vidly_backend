const config = require('config');
const logger = require('../middleware/logger');

module.exports = function () {

    if (!config.get('jwtPrivatekey')) {
        throw new Error('FATAL ERROR: jwtPrivatekey is not defined');
    }
    
    console.log(`Application Name: ${config.get('name')}`);
    console.log(`Application Name: ${config.get('mail.host')}`);
}