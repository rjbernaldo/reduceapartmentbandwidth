chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  'use strict';

  var videoId = request.videoId;

  if (videoId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/youtube/' + videoId, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        sendResponse({ message: xhr.responseText });
      }
    }

    xhr.send();
  }
});
