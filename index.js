require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 45000;

app.get('/', (req, res) => {
    res.send(`Hello, ${process.env.LOGIN_USER}!`);
});

app.listen(port);
