const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/db');
var issueRouter = require('./routes/issue.routes');

var app = express();

var router = express.Router();

app.use(bodyParser.json());
app.use(issueRouter);

app.listen(3000, () => {
    console.log('Started on port 3000');
});