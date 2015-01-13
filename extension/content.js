if (location.host === 'www.youtube.com' && location.search) {
  var videoId = location.search.split('=')[1];

  chrome.runtime.sendMessage({ videoId: videoId }, function(response) {
    console.log('Sending ' + videoId + ' to node server...');
    alert(response.message)
  });
}
