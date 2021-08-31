"use strict";

// Glitch API Link: https://groovy-busy-close.glitch.me/movies

$(document).ready(function () {
    const serverURL = 'https://groovy-busy-close.glitch.me/movies';

    //jQuery function to 'GET'
    function data (serverURL, data) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch(serverURL, options)
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(console.error);
    }

    // GET all movies?
    data(serverURL)
        .then(data => console.log(data));

    // GET single movie?
    function getMovie (ID) {
        data(`${serverURL}/${ID}`)
            .then(data => console.log('This specific movie', data));
    }

    // Delete a Movie?
    function deleteMovie (ID) {
        fetch(serverURL + "/" + ID, {method: "DELETE"})
            .then(data => console.log('Delete Movie', data));
    }


    // make cards?
    function renderData() {
        $('renderCards').html("")
        data(serverURL).then(function (data) {
            data.forEach(movie => {
                let html = "";
                html +=
            })
        })
    }









})