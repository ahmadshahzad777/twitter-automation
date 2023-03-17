const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.get('/', (req, res) => {
    db.all('SELECT * FROM retweets ORDER BY priority', (err, rows) => {
        if (err) {
            console.error('There was an error getting the retweets from the database!', err);
            return res.redirect('/');
        }
        let retweets = [];
        if (rows) {
            rows.forEach((row) => {
                let retweet = {
                    id: row.id,
                    link: Buffer.from(row.link, 'base64').toString('utf-8'),
                    time: row.time,
                    priority: row.priority,
                };

                retweets.push(retweet);
            });
        }

        return res.render('retweets', { retweets, appname: process.env.LOGIN_USER });
    });
});
