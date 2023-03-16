require('dotenv').config();

const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 45000;

nunjucks.configure(path.join(__dirname, 'views'), { express: app, autoescape: true });
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = {
    home: require(path.join(__dirname, 'routes', 'index')),
    login: require(path.join(__dirname, 'routes', 'login')),
};

app.use('/', router.home);
app.use('/login', router.login);

app.listen(port);
