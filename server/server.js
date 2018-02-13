const express = require('express');

var {mongoose} = require('./db/db');

var app = express();

app.listen(3000, () => {
    console.log('Started on port 3000');
});