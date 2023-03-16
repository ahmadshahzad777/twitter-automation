require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 45000;

const router = {
    home: require(path.join(__dirname, 'routes', 'index')),
};

app.use('/', router.home);

app.listen(port);
