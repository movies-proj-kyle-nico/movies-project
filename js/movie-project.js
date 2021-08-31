"use strict";

// Glitch API Link: https://groovy-busy-close.glitch.me/movies

$(document).ready(function () {
    const serverURL = 'https://groovy-busy-close.glitch.me/movies';

    // window.addEventListener('DOMContentLoaded', () => {
    //     alert("Loading...");
    // });

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
            // .then(data => data)
            .catch(console.error);
    }

    // GET all movies?
    // data(serverURL)
    //     .then(data => console.log(data));

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
        // $('#renderCards').html("")
        let html = "";
        data(serverURL).then(function (data) {
            console.log(data)
            data.forEach(movie => {
                html += `<div class="row row-cols-1 row-cols-md-2">
                      <div class="col mb-4">
                        <div class="card">
                          <img src="img/stock-image.jpeg" class="card-img-top movie-image" alt="stock-image">
                          <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">*ENTER DESCRIPTION HERE*</p>
                            <span>Rating: ${movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>`
            })
        }).then(() => {
                $("#renderCards").append(html)
            });
    }

    renderData();

});