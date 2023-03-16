const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const login = require(path.join(__dirname, '..', 'automaton', 'login'));

router.get('/', async (req, res) => {
    await login();
    res.redirect('/');
});
