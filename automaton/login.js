const puppeteer = require('puppeteer');

const login = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-notifications'],
        userDataDir: './userData',
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://www.twitter.com/login');
        await page.waitForNetworkIdle();

        await browser.close();
        return {
            status: true,
            code: 0,
            err: null,
        };
    } catch (err) {
        await browser.close();
        console.error('There was an error loggin in to Twitter.', err);
        return {
            status: false,
            code: 999,
            err,
        };
    }
};

module.exports = login;
