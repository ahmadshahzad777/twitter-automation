const path = require('path');
const puppeteer = require('puppeteer');

const sleep = require('./sleep');

const tweet = async (message, files, tags) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-notifications'],
        userDataDir: path.join(__dirname, 'userData'),
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://twitter.com/home');
        await page.waitForNetworkIdle();

        await sleep(3);

        await browser.close();
        return {
            status: true,
            code: 0,
            err: null,
        };
    } catch (err) {
        await browser.close();
        console.error('There was an error publishing the Tweet.', err);
        return {
            status: false,
            code: 999,
            err,
        };
    }
};

module.exports = tweet;
