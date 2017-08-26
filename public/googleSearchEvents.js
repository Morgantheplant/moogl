'use strict';
// routes user to google search and feeling lucky results
function addGoogleSearchEvents() {
  window.removeEventListener('load', addGoogleSearchEvents, false);
  // elements
  var searchButton = document.getElementById('goog-search');
  var imFeelingLuckyButton = document.getElementById('feeling-lucky');
  var mainInput = document.getElementById('search');
  // constants
  var GOOGLE_BASE = 'https://google.com';
  var LUCKY_PARAM = '&btnI';

  function search(feelingLucky) {
    var value = mainInput.value;
    if (value) {
      var searchQuery = encodeURIComponent(value.split(' ').join('+'));
      var extraParam = feelingLucky ? LUCKY_PARAM : '';
      window.location = `${GOOGLE_BASE}/search?q=${searchQuery}${extraParam}`;
    }
  }
  searchButton.addEventListener('click', search.bind(null, false));
  imFeelingLuckyButton.addEventListener('click', search.bind(null, true));
}

window.addEventListener('load', addGoogleSearchEvents, false);
