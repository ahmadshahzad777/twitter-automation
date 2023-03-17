const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));

router.post('/', (req, res) => {
    let id = req.body.id;
    const message = Buffer.from(req.body.message).toString('base64');
    const tags = Buffer.from(req.body.tags).toString('base64');
    const time = req.body.time;
    const priority = req.body.priority;

    let UPDATE_RECORD = 'UPDATE tweets SET ';
    UPDATE_RECORD += `message = "${message}", `;
    UPDATE_RECORD += `tags = "${tags}", `;
    UPDATE_RECORD += `time = "${time}", `;
    UPDATE_RECORD += `priority = ${priority} `;
    UPDATE_RECORD += `WHERE id = ${id}`;

    db.run(UPDATE_RECORD, (err) => {
        if (err) {
            console.error('There was an error updating the tweet schedule.', err);
            return res.redirect('/');
        }

        return res.redirect('/tweets');
    });
});
