const {createLogger, transports, format} = require('winston');
require('winston-mongodb');

const logger = createLogger({
    transports : [
        new transports.Console(),
        new transports.File({
            level : 'debug',
            filename : 'logWarning.log'
        }),

        new transports.File({
            level : 'info',
            filename : 'logInfo.log'
        }),
        
        // new transports.MongoDB({
        //     db : 'mongodb://localhost/vidly',
        //     options: {useNewUrlParser: true, useUnifiedTopology: true},
        //     collection : 'logs',
        //     level: 'error'
        // })
    ],

    exceptionHandlers : [
        new transports.Console({ handleExceptions: true}) 
    ],

    format :  format.combine (
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint(),
    )
})
module.exports = logger