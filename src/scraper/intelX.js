const {siteSchema, dbgLog, createFile, errLog, stripTld, stdLog} = require("../lib/sharedUtils");
const { Worker, Queue} = require('bullmq');
const { chromium, firefox } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')();
const Redis = require("ioredis");
const  moment =  require("moment");
const os = require("os");
const mongoose = require('mongoose').default;
const Group = require("../models/group");
const fs = require('fs');


let createGroup = (location) => {
    // create a new group for new provider
    return {
        captcha: false,
        meta: null,
        locations: [
            siteSchema(location)
        ],
        profile: [],
        ransomware_galaxy_value: ''
    };
}

let checkExisting = async (provider, db) => {
    const redis = new Redis({
        path: '/path/to/your/redis/socket',
        db: db
    });
    try {
        const keys = await redis.keys('*');
        return keys.includes(provider);
    } catch (error) {
        dbgLog(error);
        return false;
    } finally {
        redis.disconnect();
    }
}


async function threadScape({host, name}) {
    let browser;
    console.log(`Starting : ${host.fqdn} --------- ${name}`);
    host.available = false;

    try {
        chromium.use(stealth);
        firefox.use(stealth);
        if (['blackbasta', 'clop', 'metaencryptor'].includes(name)) {
            browser = await firefox.launch({
                proxy: { server: 'socks5://127.0.0.1:9050' },
                args: [`--unsafely-treat-insecure-origin-as-secure=${host.slug}`],
                headless: true,
            });
        } else {
            browser = await chromium.launch({
                proxy: { server: 'socks5://127.0.0.1:9050' },
                args: [`--unsafely-treat-insecure-origin-as-secure=${host.slug}`],
                headless: true,
            });
        }

        const context = await browser.newContext({ ignoreHTTPSErrors: true });
        const page = await context.newPage();

        if (host.timeout) {
            await page.goto(host.slug, { waitUntil: 'load', timeout: host.timeout * 1000 });
        } else {
            await page.goto(host.slug, { waitUntil: 'load', timeout: 120000 });
        }

        await page.bringToFront();

        const delay = host.delay ? host.delay * 1000 : 15000;
        await page.waitForTimeout(delay);

        await page.mouse.move(500, 400);

        await page.waitForSelector('body'); // Wait for an element to indicate page load

        await page.mouse.wheel(0, 2000);

        await page.waitForSelector('body'); // Wait for any additional page load after scrolling

        await page.waitForTimeout(5000);

        const filename = `${name}-${stripTld(host.slug)}.html`;
        const path = 'siteSources';


        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        const filePath = `${path}/${filename}`;

        const content = await page.content();

        fs.writeFileSync(filePath, content, 'utf-8');

        console.log(`Page content saved to: ${filePath}`);


        const screenshotPath = path.join(os.homedir(), 'source/screenshots', `${name}-${createFile(host.slug)}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        host.available = true;
        host.title = await page.title();
        host.lastscrape = moment().toString();
        host.updated = moment().toString();

    } catch (error) {
        errLog(error);
    } finally {
        // Close the browser
        await browser.close();
        console.log(`Leaving : ${host.fqdn} --------- ${name}`);
    }
}


let scraper = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/intelx');

    let groups = await Group.find({});

    groups.sort((a, b) => b.locations.length - a.locations.length);


    const workerQueue = new Queue('workerQueue');

    for (const group of groups) {
        //console.log('Working on', group.name);

        for (const host of group.locations) {
            const data = { host, name: group.name};
            await workerQueue.add('processHost', data);
        }
    }

   await workerQueue.close();

}

// Set up a worker to process jobs
const worker = new Worker('workerQueue', async (job) => {
    await threadScape(job.data);
});

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    errLog(`${job.id} has failed with ${err.message}`);
});

scraper().then(() => console.log("runningg")).catch(err => console.log(err))