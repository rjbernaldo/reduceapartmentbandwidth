var ytdl = require('ytdl-core');
var fs = require('fs');
var ytFolder = '/Users/rj/Desktop/Youtube/';
var progress = require('progress-stream');
var p = progress({ time:100 });
var size = 0;

p.on('progress', function(progress) {
  console.log(progress.transferred, progress.speed, size);
});

function download(req, res) {
  'use strict';

  var videoId = req.params.videoId;
  console.log('Request for ' + videoId + ' received');

  ytdl.getInfo('http://www.youtube.com/watch?v=' + videoId, { downloadURL: true },
  function(err, info) {
    if (info) {
      var videoTitle = info.title;

      checkFolder(videoTitle, function(videoIsPresent) {
        if (!videoIsPresent) {

          var y = ytdl.downloadFromInfo(info)
              .pipe(p)
              .pipe(fs.createWriteStream(ytFolder + videoTitle + '.mp4'));

          y.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info.filename);
            console.log('size: ' + info.size);
            size = info.size;
          });

          res.status(200, {
            message: 'Downloading ' + videoTitle
          });

          res.end();

        } else {
          res.status(404, {
            message: videoTitle + ' has already been saved'
          });

          res.end();

        }
      });

    } else {
      res.status(404, {
        message: 'Invalid URL'
      });

      res.end();

    }
  });


}

function checkFolder(title, done) {
  'use strict';

  fs.readdir(ytFolder, function(err, files) {
    if (!err) {
      files.forEach(function(filename) {
        if (filename === title + '.mp4') {
          done(true);
        }
      });

      done(false);
    }
  });
}

module.exports = {
  download: download
};
