'use strict'

function getLyrics(artist, title) {
  // dynamically generate the URL
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  console.log(`Finding lyrics for ${title} by ${artist}`);

  // get data for the API, if error is returned, display error

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      $('#results').empty();
      $('#js-error-message').removeClass('hidden');
    });


}

function displayResults(responseJson) {

  console.log(responseJson);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const artist = $('.js-query-artist').val();
    if (artist == '') {
      alert('please select an artist');
    }
    const title = $('.js-query-title').val();
    if (title == '') {
      alert('please enter song title');
    }
    getLyrics(artist, title);
  });
}


$(watchForm);