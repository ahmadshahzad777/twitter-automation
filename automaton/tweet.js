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

        const editor =
            '.public-DraftEditor-content[aria-label="Tweet text"][data-testid="tweetTextarea_0"][role=textbox]';
        await page.waitForSelector(editor);
        await page.click(editor);
        await page.click(editor);

        const editorActive =
            '.public-DraftEditor-content[aria-label="Tweet text"][data-testid="tweetTextarea_0"][role=textbox][data-focusvisible-polyfill=true]';
        await page.waitForSelector(editorActive);

        await page.type(editorActive, message, { delay: 25 });

        if (files.length > 0 && files[0] !== '') {
            const fileInput = 'input[data-testid=fileInput][type=file][multiple]';
            await page.waitForSelector(fileInput);
            const upload = await page.$(fileInput);

            for (let i = 0; i < files.length; i++) {
                await upload.uploadFile(path.join(__dirname, '..', 'public', 'uploads', files[i]));
                await sleep(1.5);
            }
        }

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
