'use strict';

// step 1, watch for user input

function watchSubmit() {

    $('.js-search-form').submit(event => {

        event.preventDefault();

        let artist = $('.js-query-artist').val();
        if (artist == '') {
            alert('Please select an artist');
        }

        let title = $('.js-query-title').val();
        if (title == '') {
            alert('Please select a song title');
        } else {
            getDataFromApi(artist, title);
        }
    });
}

// step 2, define the function ot make the api call

function getDataFromApi(artist, title) {

    console.log(`Getting lyrics for ${title}, by ${artist}`);

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText); 
    })
    .then(responseJson => displaySearchData(responseJson))
    .catch(err => {
        console.log(err);
    });
}

// step 3, display the results

function displaySearchData(responseJson) {

    console.log(responseJson);

    if (responseJson.lyrics == '') {
        alert('No results');
    } else {
        let HtmlOutput = "<pre><code>" + responseJson.lyrics + "</code></pre>"

        $('.js-search-results').html(HtmlOutput);
    }
}


$(watchSubmit);