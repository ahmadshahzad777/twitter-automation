require('dotenv').config();

const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = process.env.PORT || 45000;

nunjucks.configure(path.join(__dirname, 'views'), { express: app, autoescape: true });
app.set('view engine', 'html');

const router = {
    home: require(path.join(__dirname, 'routes', 'index')),
};

app.use('/', router.home);

app.listen(port);
