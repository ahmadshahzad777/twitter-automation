const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', (req, res) => {
    let id = req.body.id;
    let link = Buffer.from(req.body.link).toString('base64');
    let date = req.body.time;
    let priority = req.body.priority;

    let UPDATE_RECORD = 'UPDATE retweets SET ';
    UPDATE_RECORD += `link = "${link}", `;
    UPDATE_RECORD += `time = "${date}", `;
    UPDATE_RECORD += `priority = ${priority} `;
    UPDATE_RECORD += `WHERE id = ${id}`;

    db.run(UPDATE_RECORD, (err) => {
        if (err) {
            console.error('There was an error updating the retweet schedule.', err);
            return res.redirect('/');
        }

        return res.redirect('/retweets');
    });
});
