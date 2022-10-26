const expressWiston = require('express-winston');
const logger  = require('../middleware/logger');
require('express-async-errors');
require('winston-mongodb');

module.exports = function(app) {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
    app.use(expressWiston.logger({
        winstonInstance : logger,
        statusLevels : true 
    }));
}