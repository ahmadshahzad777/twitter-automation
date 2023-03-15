const path = require('path');
const puppeteer = require('puppeteer');

const sleep = require('./sleep');

const retweet = async (link) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-notifications'],
        userDataDir: path.join(__dirname, 'userData'),
    });

    const page = await browser.newPage();

    try {
        await page.goto(link);

        await sleep(3);

        await browser.close();
        return {
            status: true,
            code: 0,
            err: null,
        };
    } catch (err) {
        await browser.close();
        console.error('There was an error retweeting the Tweet.', err);
        return {
            status: false,
            code: 999,
            err,
        };
    }
};

module.exports = retweet;
