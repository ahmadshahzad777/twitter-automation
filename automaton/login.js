const path = require('path');
const puppeteer = require('puppeteer');

const login = async () => {
    const username = process.env.LOGIN_USER;
    const password = process.env.LOGIN_PASS;

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--disable-notifications'],
        userDataDir: path.join(__dirname, 'userData'),
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://www.twitter.com/login');
        await page.waitForNetworkIdle();

        if ((await page.url()) !== 'https://twitter.com/i/flow/login') {
            await browser.close();
            return {
                status: true,
                code: 1,
                err: null,
            };
        }

        const usernameField = 'input[autocomplete=username][name=text]';
        const passwordField = 'input[autocomplete=current-password][name=password]';

        await page.waitForSelector(usernameField);
        await page.type(usernameField, username, { delay: 25 });

        const [nextButton] = await page.$x("//span[contains(., 'Next')]");
        await nextButton.click();
        await page.waitForNetworkIdle();

        await page.waitForSelector(passwordField);
        await page.type(passwordField, password, { delay: 25 });

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
