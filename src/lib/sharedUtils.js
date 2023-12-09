const winston = require('winston');
const tldExtract = require('tld-extract');
const path = require('path');
const { parse: urlparse, urlSplit } = require('url');
const {readFileSync, existsSync} = require("fs");
require('dotenv').config();

const envGlobalName = process.env.MY_APP_HOME;
//Logging utilities
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        winston.format.printf((info) => `${info.timestamp},${info.level.toUpperCase()} ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: '/home/mrima/WebstormProjects/intelx/error.log', level: 'error' }),
    ],
});

// Standard info logging
let stdLog = (msg) => {
    logger.info(msg);
};

// Standard debug logging
let dbgLog = (msg) => {
    logger.debug(msg);
};

// Standard error logging
let errLog = (msg) => {
    logger.warn(msg);
};

// Critical error logging with termination
let fatalError = (msg) => {
    logger.error(msg);
    process.exit(1);
};

/**
 * Returns a dictionary with the site schema.
 * @param {string} location - The site location.
 * @returns {Object} The site schema.
 */
let siteSchema = (location) => {
    if (!location.startsWith('http')) {
        dbgLog('sharedUtils: assuming we have been given an fqdn and appending protocol');
        location = 'http://' + location;
    }

    const schema = {
        fqdn: getApex(location),
        title: null,
        timeout: null,
        delay: null,
        version: getOnionVersion(location)[0],
        slug: location,
        available: false,
        updated: null,
        lastscrape: '2021-05-01 00:00:00.000000',
    };

    dbgLog('sharedUtils: schema - ' + JSON.stringify(schema));
    return schema;
};

/**
 * Returns the domain for a given webpage/url slug.
 * @param {string} slug - The URL slug.
 * @returns {string} The domain.
 */
function getApex(slug) {
    const stripUrl = tldExtract.extract(slug);
    if (stripUrl.sub) {
        return stripUrl.sub + '.' + stripUrl.domain + '.' + stripUrl.suffix;
    } else {
        return stripUrl.domain + '.' + stripUrl.suffix;
    }
}


/**
 * Returns the version of an onion service (v2/v3).
 * @param {string} slug - The URL slug.
 * @returns {[number, string]} The version and location.
 */
let getOnionVersion = (slug) => {
    let version;
    const stripUrl = tldExtract.extract(slug);
    const location = stripUrl.domain + '.' + stripUrl.suffix;

    stdLog('sharedUtils: checking for onion version - ' + location);

    if (stripUrl.domain.length === 16) {
        stdLog
        ('sharedUtils: v2 onionsite detected');
        version = 2;
    } else if (stripUrl.domain.length === 56) {
        stdLog('sharedUtils: v3 onionsite detected');
        version = 3;
    } else {
        stdLog
        ('sharedUtils: unknown onion version, assuming clearnet');
        version = 0;
    }

    return [version, location];
}

/**
 * Strips the top-level domain (TLD) from a URL.
 * @param {string} slug - The URL slug.
 * @returns {string} The stripped URL.
 */
let stripTld = (slug) => {
    const parsed = urlparse(slug);
    const scheme = `${parsed.protocol}//`;
    return parsed.href.replace(scheme, '').replace('/', '-');
};

/**
 * Creates a file name based on the URL slug.
 * @param {string} slug - The URL slug.
 * @returns {string} The created file name.
 */
let createFile = (slug) => {
    const schema = urlSplit(slug);
    const filename = schema.hostname + schema.pathname.replace('/', '');
    return filename.replace(/\./g, '');
};

const homedir = getHomedir();

function getHomedir() {
    if (!process.env[envGlobalName]) {
        const envFile = path.join(__dirname, '..', '..', '..', '.env');
        if (existsSync(envFile)) {
            const lines = readFileSync(envFile, 'utf-8').split('\n');
            for (const line of lines) {
                const [key, value] = line.split('=', 2);
                if (value && (value.startsWith('"') || value.startsWith("'"))) {
                    process.env[key] = value.slice(1, -1);
                } else {
                    process.env[key] = value;
                }
            }
        }
    }

    if (!process.env[envGlobalName]) {
        const guessedHome = path.join(__dirname, '..', '..', '..');

        throw new Error(
            `${envGlobalName} is missing. Run the following command (assuming you run the code from the cloned repository): export ${envGlobalName}='${guessedHome}'`
        );
    }

    return path.resolve(process.env[envGlobalName]);
}
function getSocketPath(name) {
    const mapping = {
        cache: path.join('cache', 'cache.sock'),
        indexing: path.join('indexing', 'indexing.sock'),
    };
    return path.join(homedir, mapping[name]);
}
module.exports = {stdLog, dbgLog, errLog, fatalError, siteSchema, getApex, getOnionVersion, stripTld, createFile, getSocketPath};

