const express = require('express');
const app = express();

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
module.exports = {logger};
