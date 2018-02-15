var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploadController = require('../controllers/upload.controller');

// Multer storage config
var storage = multer.diskStorage({
    // Set destination folder
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
var upload = multer({ storage: storage });

router.post('/upload/:issueId', upload.array("files", 10), uploadController.uploadFile);

module.exports = router;