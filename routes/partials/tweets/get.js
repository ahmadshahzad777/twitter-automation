const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.get('/', (req, res) => {
    db.all('SELECT * FROM tweets ORDER BY priority', (err, rows) => {
        if (err) {
            console.error('There was an error getting the tweets from the database!', err);
            return res.redirect('/');
        }
        let tweets = [];
        if (rows) {
            rows.forEach((row) => {
                let tweet = {
                    id: row.id,
                    message: Buffer.from(row.message, 'base64').toString('utf-8'),
                    files: Buffer.from(row.files, 'base64').toString('utf-8').split('/-|-/'),
                    tags: Buffer.from(row.tags, 'base64').toString('utf-8').split('|'),
                    time: row.time,
                    priority: row.priority,
                };

                tweets.push(tweet);
            });
        }

        return res.render('tweets', { tweets, appname: process.env.LOGIN_USER });
    });
});
