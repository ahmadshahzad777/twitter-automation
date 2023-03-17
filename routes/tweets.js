const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const tweets = {
    // get: require(path.join(__dirname, 'partials', 'tweets', 'get')),
    // now: require(path.join(__dirname, 'partials', 'tweets', 'now')),
    // order: require(path.join(__dirname, 'partials', 'tweets', 'order')),
    create: require(path.join(__dirname, 'partials', 'tweets', 'create')),
    // update: require(path.join(__dirname, 'partials', 'tweets', 'update')),
    // delete: require(path.join(__dirname, 'partials', 'tweets', 'delete')),
    // reorder: require(path.join(__dirname, 'partials', 'tweets', 'reorder')),
};

// router.use('/', tweets.get);
// router.use('/now', tweets.now);
// router.use('/order', tweets.order);
router.use('/create', tweets.create);
// router.use('/update', tweets.update);
// router.use('/delete', tweets.delete);
// router.use('/reorder', tweets.reorder);
