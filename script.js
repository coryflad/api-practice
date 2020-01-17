'use strict';

function getLyrics(artist, title) {
  // dynamically generate the URL
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
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {

  console.log(responseJson);

  // if there are previous results, remove them 
  $("#results").empty();
  console.log("emptied");

  // add the lyrics to the results section
  $("#results").append(`${responseJson.lyrics}`);

  // display the results section
  $("#results").removeClass("hidden");
  console.log("displayed");

}

// be on the lookout for form submissions
// get the artist and title
// call `getLyrics` with them
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const artist = $('.js-query-artist').val();
    if (artist == '') {
      alert('Please selct an artist');
    }
    const title = $('.js-query-title').val();
    if (title == '') {
      alert('Please enter the title');
    }
    getLyrics(artist, title);
  });
}
$(watchForm);
