const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', (req, res) => {
    let link = Buffer.from(req.body.link).toString('base64');
    let date = req.body.time;
    let priority = new Date(date).getTime();

    let INSERT_RECORD = 'INSERT INTO retweets (link, time, priority) VALUES (';
    INSERT_RECORD += `"${link}", `;
    INSERT_RECORD += `"${date}", `;
    INSERT_RECORD += priority;
    INSERT_RECORD += ')';

    db.run(INSERT_RECORD, (err) => {
        if (err) {
            console.error('There was an error creating the retweet schedule.', err);
            return res.redirect('/');
        }

        return res.redirect('/posts');
    });
});
