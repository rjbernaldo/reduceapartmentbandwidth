if (location.host === 'www.youtube.com' && location.search) {
  var videoId = location.search.split('=')[1];

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://localhost:3000/youtube/' + videoId, true);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.send();
}
