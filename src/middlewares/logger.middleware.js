import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;

// Self made logging

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`;

//         await fsPromise.appendFile('log.txt', logData);
//     } catch (err) {
//         console.log(err);
//     }
// }

// Built-in logging using Winston.

export const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
})

const loggerMiddleware = async (req, res, next) => {
    // 1.Log request Body.
    if (!req.url.includes('signin')) {
        const logData = `${JSON.stringify(req.body)} - ${req.url}`;
        logger.info(new Date().toLocaleString()+ " - " + logData);
    }
    next();
}

export default loggerMiddleware;