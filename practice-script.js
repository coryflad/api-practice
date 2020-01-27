'use strict';


function useApi(artist, title) {

    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        console.log(err);
    });
}

function displayResults(responseJson) {

    console.log(responseJson);

    let HtmlOutput = `<pre><code>${responseJson.lyrics}</code></pre>`;

    $('.js-search-results').html(HtmlOutput);
    


}


function watchSubmit() {

    $('.js-search-form').submit(event => {

        event.preventDefault();

        let artist = $('.js-query-artist').val();
        console.log(artist);

        if(artist == '') {
            alert('please enter artist name');
        }

        let title = $('.js-query-title').val();
        console.log(artist,title);

        if(title == '') {
            alert('please enter song title');
        } else {
            useApi(artist,title);
        }
    });

}

$(watchSubmit);

