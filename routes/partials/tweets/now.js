const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const db = require(path.join(__dirname, '..', '..', '..', 'db'));
const upload = require(path.join(__dirname, '..', '..', '..', 'upload'));
const tweet = require(path.join(__dirname, '..', '..', '..', 'automaton', 'tweet'));

router.post(
    '/',
    upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }, { name: 'img4' }]),
    async (req, res) => {
        let id = req.body.id;
        let the_images = '';

        if (Object.keys(req.files).length > 0) {
            Object.keys(req.files).forEach((file) => {
                the_images += `${req.files[file][0].filename}/-|-/`;
            });
        }

        the_images = the_images.slice(0, -5);

        const message = req.body.message;
        let images = the_images.split('/-|-/');
        const tags = req.body.tags;

        if (id) {
            db.get(`SELECT files FROM tweets WHERE id = ${id}`, (err, row) => {
                if (err) {
                    console.error('There was an error getting the tweet images from the database.');
                    res.redirect('/tweets');
                } else {
                    images = Buffer.from(row.files, 'base64').toString('utf-8');
                }
            });
        }

        if (await tweet(message, images, tags)) {
            if (images.length > 0 && images[0] !== '') {
                images.forEach((image) => {
                    fs.unlink(path.join(__dirname, '..', '..', '..', 'public', 'uploads', image), (err) => {
                        if (err) {
                            console.error('There was an error deleting the images from the storage.');
                        }
                    });
                });
            }

            if (id) {
                db.run(`DELETE FROM tweets WHERE id = ${id}`, (err) => {
                    if (err) {
                        console.error('There was an error deleting the tweet from the database.');
                    }
                });

                return res.redirect('/tweets');
            } else {
                res.redirect('/');
            }
        }
    },
);
