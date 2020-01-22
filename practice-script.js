'use strict';



function watchUserInput() {

    $('.js-search-form').submit(event => {

        event.preventDefault();

        let artist = $('.js-query-artist').val();
        // ensure this test is always present
        console.log(artist);
        if (artist == '') {
            alert('please enter artist');
        }
        
        let title = $('.js-query-title').val();
        // ensure this test is always present
        console.log(artist, title);
        if (title == '') {
            alert('please etner song title');
        } 
        else {
            useApi(artist, title);
        }
    });


}

function useApi(artist, title) {

    console.log('finding lyrics');

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    // ensure this test is always present
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayApiData(responseJson))
        .catch(err => {
            console.log(err)
        });
}

function displayApiData(responseJson) {

    console.log(responseJson);

    if (responseJson.lyrics == '') {
        alert('no lyrics found')
    } else {
        let HtmlOutput = '<pre><code>' + responseJson.lyrics + '</code></pre>'

        $('.js-search-results').html(HtmlOutput);
    }


}



$(watchUserInput);