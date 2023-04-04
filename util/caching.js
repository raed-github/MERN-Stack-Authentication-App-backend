const Memcached = require('memcached');
const memcached = new Memcached(process.env.MEMCACHED_URI);
const {logger} = require('../util/logging')

// Cache middleware
const cache = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    memcached.get(key, (err, cachedData) => {
    if (cachedData) {
        logger.log('info', `loading cached response. key=${key}`);
        res.send(cachedData);
        return;
    } else {
        logger.log('info', `loading data from db`);
        res.sendResponse = res.send;
        res.send = (body) => {
            memcached.set(key, body,3600, (err, data) => {
            if (err || !data) {
                logger.log('info', `${err}`);
            }
            logger.log('info', `caching response under key=${key}`);
        });
        res.sendResponse(body);
        };
        next();
    }
    });
};

module.exports = {cache}