const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));
const upload = require(path.join(__dirname, '..', '..', '..', 'upload'));

router.post(
    '/',
    upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }, { name: 'img4' }]),
    (req, res) => {
        let the_images = '';

        if (Object.keys(req.files).length > 0) {
            Object.keys(req.files).forEach((file) => {
                the_images += `${req.files[file][0].filename}/-|-/`;
            });
        }

        the_images = the_images.slice(0, -5);

        const message = Buffer.from(req.body.message).toString('base64');
        const images = Buffer.from(the_images).toString('base64');
        const time = req.body.time;
        const priority = new Date(time).getTime();
        const tags = Buffer.from(req.body.tags).toString('base64');

        let INSERT_RECORD = 'INSERT INTO tweets (message, files, time, tags, priority) VALUES (';
        INSERT_RECORD += "'" + message + "', ";
        INSERT_RECORD += "'" + images + "', ";
        INSERT_RECORD += "'" + time + "', ";
        INSERT_RECORD += "'" + tags + "', ";
        INSERT_RECORD += priority;
        INSERT_RECORD += ')';

        db.run(INSERT_RECORD, (err) => {
            if (err) {
                console.error('There was an error creating the tweet schedule.', err);
                return res.redirect('/');
            }

            return res.redirect('/tweets');
        });
    },
);
