const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const retweet = require(path.join(__dirname, '..', '..', '..', 'automaton', 'retweet'));

router.post('/', async (req, res) => {
    let link = req.body.link;

    await retweet(link);
    res.redirect('/');
});
