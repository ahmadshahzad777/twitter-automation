const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const retweets = {
    // get: require(path.join(__dirname, 'partials', 'retweets', 'get')),
    now: require(path.join(__dirname, 'partials', 'retweets', 'now')),
    // order: require(path.join(__dirname, 'partials', 'retweets', 'order')),
    create: require(path.join(__dirname, 'partials', 'retweets', 'create')),
    // update: require(path.join(__dirname, 'partials', 'retweets', 'update')),
    // delete: require(path.join(__dirname, 'partials', 'retweets', 'delete')),
    // reorder: require(path.join(__dirname, 'partials', 'retweets', 'reorder')),
};

// router.use('/', retweets.get);
router.use('/now', retweets.now);
// router.use('/order', retweets.order);
router.use('/create', retweets.create);
// router.use('/update', retweets.update);
// router.use('/delete', retweets.delete);
// router.use('/reorder', retweets.reorder);
