const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `MFSSIA off-chain Business Contract Verifier`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `[${info.level}]: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
});

module.exports = {
    logger
}