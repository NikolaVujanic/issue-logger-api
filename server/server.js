const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;

var {mongoose} = require('./db/db');
var issueRouter = require('./routes/issue.routes');
var commentRouter = require('./routes/comment.routes');
var uploadRouter = require('./routes/upload.routes');
var downloadRouter = require('./routes/download.routes');

var app = express();

var router = express.Router();

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(issueRouter);
app.use(commentRouter);
app.use(uploadRouter);
app.use(downloadRouter);

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = {app};