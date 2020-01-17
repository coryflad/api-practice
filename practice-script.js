'use strict';

function getLyrics(artist, title) {

  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  console.log(`Finding lyrics for ${title} by ${artist}`);
 
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
      $('#js-error-message').removeClass('hidden');
    });
}

function displayResults(responseJson) {

  console.log(responseJson);

  $('#results').html('');
  console.log('emptied');

  $('#results').append(
    `<p>Here are the lyrics requested:</p>
    ${responseJson.lyrics}`);

  $('#results').removeClass('hidden');
  console.log('displayed');

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const artist = $('.js-query-artist').val();
    if (artist == '') {
      alert('Please select an artist');
    }
    const title = $('.js-query-title').val();
    if (title == '') {
      alert('Please enter a song title');
    }
    getLyrics(artist, title);
  });
}
$(watchForm);