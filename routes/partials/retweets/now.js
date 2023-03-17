const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));
const retweet = require(path.join(__dirname, '..', '..', '..', 'automaton', 'retweet'));

router.post('/', async (req, res) => {
    let link = req.body.link;
    let id = req.body.id;

    if (await retweet(link)) {
        if (id) {
            db.run(`DELETE FROM retweets WHERE id = ${id}`, (err) => {
                if (err) {
                    console.error('There was an error deleting the retweet from the database.');
                }
                return res.redirect('/retweets');
            });
        } else {
            res.redirect('/');
        }
    }
});
