const { errLog} = require("../lib/sharedUtils");
const { Worker, Queue} = require('bullmq');
const { chromium, firefox } = require('playwright-extra')
const stealth = require('puppeteer-extra-plugin-stealth')();
const  moment =  require("moment");
const mongoose = require('mongoose').default;
const Group = require("../models/group");
const Incident = require("../models/incident")


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));



async function threadScape({host, name}) {
    let browser;
    let page;
    let context;
    console.log(`Starting : ${host.fqdn} --------- ${name}`);
    host.available = false;

    chromium.use(stealth);
    firefox.use(stealth);
    try {
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

         context = await browser.newContext({ ignoreHTTPSErrors: true });
         page = await context.newPage();

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

        const content = await page.content();
        const parser = require(`./parsers/${name}`);
        const posts = parser(content);


        try {
            for (const post of posts) {
                let query = {};
                if (post.link) {
                    query = { link: post.link };
                } else if (post.title) {
                    query = { title: post.title };
                } else {
                    console.error('Post has neither a link nor a title:', post);
                    continue;
                }

                await Incident.updateOne(
                    query,
                    { $set: post },
                    { upsert: true }
                );
            }
            console.log('Posts saved successfully to MongoDB');
        } catch (error) {
            console.error('Error saving posts to MongoDB:', error);
        }

        let group = Group.find({name});

        const matchingLocation = group.locations.find(location => location.slug === host.slug);
        if (matchingLocation) {
            matchingLocation.available = host.available = true;
            matchingLocation.title =  host.title = await page.title();
            matchingLocation.lastScrape = host.lastscrape = moment().toString();
            matchingLocation.updated = host.updated = moment().toString();

            try {
                await group.save();
                console.log("Location updated successfully.");
            } catch (error) {
                console.error("Error updating location:", error);
            }
        } else {
            console.log("No location found with matching slug:", host.slug);
        }
    } catch (error) {
        errLog(error);
    } finally {
        await context.close();
        console.log(`Leaving : ${host.fqdn} --------- ${name}`);
        await sleep(2000);
    }
}


let scraper = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017/intelx');

    let groups = await Group.find({});
    groups.sort((a, b) => b.locations.length - a.locations.length);


    const workerQueue = new Queue('workerQueue');

    for (const group of groups) {
        for (const host of group.locations) {
            const data = { host, name: group.name};
            await workerQueue.add('processHost', data);
        }
    }

   await workerQueue.close();

}

// Set up a worker to process jobs
const worker = new Worker('workerQueue', async (job) => {
    try {
        await threadScape(job.data);
    } catch (err) {
        errLog(err);
    }
});

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    errLog(`${job.id} has failed with ${err.message}`);
});

scraper().then(() => console.log("running")).catch(err => console.log(err))