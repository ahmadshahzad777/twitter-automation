const path = require('path');
const cron = require('node-cron');

const db = require(path.join(__dirname, 'db'));

const pubTweet = require(path.join(__dirname, 'automaton', 'tweet'));
const pubRetweet = require(path.join(__dirname, 'automaton', 'retweet'));

cron.schedule('*/5 * * * *', () => {
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
                    let link = retweet.link;

                    try {
                        if (await pubTweet(link)) {
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
