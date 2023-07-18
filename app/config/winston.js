const appRoot = require('app-root-path');
const winston = require('winston');

var options = {
    combined: {
      level: 'info',
      filename: `${appRoot}/logs/combined.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    error:{
        level: 'error',
        filename: `${appRoot}/logs/combined.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    debug: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const logger = winston.createLogger({
    'format': winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.prettyPrint()
    ),
    'transports': [
      new winston.transports.File(options.combined),
      new winston.transports.File(options.error),
      new winston.transports.Console(options.debug)
    ]
});

module.exports = logger;