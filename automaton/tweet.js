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
        await page.type(editor, message, { delay: 25 });

        if (files.length > 0 && files[0] !== '') {
            const fileInput = 'input[data-testid=fileInput][type=file][multiple]';
            await page.waitForSelector(fileInput);
            const upload = await page.$(fileInput);

            for (let i = 0; i < files.length; i++) {
                await upload.uploadFile(path.join(__dirname, '..', 'public', 'uploads', files[i]));
                await sleep(1.5);
            }

            if (tags.length > 0 && tags[0] !== '') {
                const tagOpen = 'a[aria-label="Tag people"][href="/compose/tweet/tags"]';
                await page.waitForSelector(tagOpen);
                await page.click(tagOpen);

                for (let i = 0; i < tags.length; i++) {
                    const tagField =
                        'input[aria-label="Search query"][placeholder="Search people"][data-testid=searchPeople]';
                    await page.waitForSelector(tagField);
                    await page.click(tagField);
                    await page.type(tagField, tags[i]);
                    await page.waitForNetworkIdle();

                    const tagItem = 'div[data-testid=TypeaheadUser]';
                    if (await page.$(tagItem)) {
                        await page.click(tagItem);
                        await page.waitForNetworkIdle();
                    }

                    const tagFilled = 'label[data-testid=searchPeople_label]';
                    await page.click(tagFilled, { clickCount: 3 });
                    await page.keyboard.press('Backspace');
                    await sleep(1.5);
                }

                if (!(await page.$('div[aria-label$="select to remove"]'))) {
                    await page.click('div[aria-label=Close][data-testid=app-bar-close]');
                } else {
                    const [done] = await page.$x(`//span[contains(., 'Done')]`);
                    await done.click();
                }
            }
        }

        const tweetButton = 'div[data-testid="tweetButtonInline"]';
        await page.waitForSelector(tweetButton);
        await page.click(tweetButton);
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
