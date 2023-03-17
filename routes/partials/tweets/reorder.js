const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', (req, res) => {
    const tweets = req.body.lem;

    tweets.forEach((tweet, index) => {
        db.run(`UPDATE tweets SET priority = ${index} WHERE id = ${tweet.id}`, (err) => {
            if (err) {
                console.error('There was an error updating the tweets index in the database', err);
            }
        });
    });

    return res.json({ status: true });
});
