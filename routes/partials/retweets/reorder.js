const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', (req, res) => {
    const retweets = req.body.lem;

    retweets.forEach((retweet, index) => {
        db.run(`UPDATE retweets SET priority = ${index} WHERE id = ${retweet.id}`, (err) => {
            if (err) {
                console.error('There was an error updating the retweets index in the database', err);
            }
        });
    });

    return res.json({ status: true });
});
