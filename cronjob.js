const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const db = require(path.join(__dirname, 'db'));

const pubTweet = require(path.join(__dirname, 'automaton', 'tweet'));
const pubRetweet = require(path.join(__dirname, 'automaton', 'retweet'));

cron.schedule('*/7 * * * *', () => {
    db.all('SELECT * FROM retweets', async (err, retweets) => {
        if (err) {
            console.error('There was an error getting the records from the database.');
        }

        if (retweets.length > 0) {
            for (let i = 0; i < retweets.length; i++) {
                let retweet = retweets[i];
                let time = new Date(retweet.time).getTime();

                if (time <= new Date().getTime()) {
                    let id = retweet.id;
                    let link = Buffer.from(retweet.link, 'base64').toString('utf-8');

                    try {
                        if (await pubRetweet(link)) {
                            db.run(`DELETE FROM retweets WHERE id = ${id}`, (err) => {
                                if (err) {
                                    return console.error(
                                        'There was an error deleting the published retweet from the database.',
                                        err,
                                    );
                                }
                            });
                        }
                    } catch (err) {
                        if (err) {
                            console.error('There was an error publishing the scheduled retweet.', err);
                        }
                    }
                }
            }
        }
    });
});

cron.schedule('*/7 * * * *', () => {
    db.all('SELECT * FROM tweets', async (err, tweets) => {
        if (err) {
            console.error('There was an error getting the tweets from the database.');
        }

        if (tweets.length > 0) {
            for (let i = 0; i < tweets.length; i++) {
                let tweet = tweets[i];
                let time = new Date(tweet.time).getTime();

                if (time <= new Date().getTime()) {
                    let id = tweet.id;
                    let message = Buffer.from(tweet.message, 'base64').toString('utf-8');
                    let images = Buffer.from(tweet.files, 'base64').toString('utf-8').split('/-|-/');
                    let tags = Buffer.from(tweet.tags, 'base64').toString('utf-8').split('|');

                    try {
                        if (await pubTweet(message, images, tags)) {
                            db.run(`DELETE FROM tweets WHERE id = ${id}`, (err) => {
                                if (err) {
                                    return console.error(
                                        'There was an error deleting the published tweet from the database.',
                                        err,
                                    );
                                }

                                images.forEach((image) => {
                                    fs.unlink(path.join(__dirname, 'public', 'uploads', image), (err) => {
                                        if (err) {
                                            console.error('There was an error deleting the images from the storage.');
                                        }
                                    });
                                });
                            });
                        }
                    } catch (err) {
                        console.error('There was an error tweeting.', err);
                    }
                }
            }
        }
    });
});
