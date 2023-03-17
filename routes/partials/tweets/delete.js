const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', async (req, res) => {
    let id = req.body.id;

    db.run(`DELETE FROM tweets WHERE id = ${id}`, (err) => {
        if (err) {
            console.error('There was an error deleting the tweet from the database.');
        }
        return res.redirect('/tweets');
    });
});
