var express = require('express');
var router = express.Router();
var youtube = require('../lib/youtube.js');

/*
*   Video
*/
router.get('/youtube/:videoId', youtube.download);
// router.get('/vimeo/:videoId', vimeo.download);
// router.get('/dailymotion/:videoId', dailymotion.download);

/*
*   Audio
*/
// router.get('/soundcloud/:audioId', soundcloud.download);

module.exports = router;
