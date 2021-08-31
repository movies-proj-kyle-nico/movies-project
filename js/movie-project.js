"use strict";

// Glitch API Link: https://groovy-busy-close.glitch.me/movies

$(document).ready(function () {

    const serverURL = 'https://groovy-busy-close.glitch.me/movies';

    $.holdReady( true );

    //jQuery function to 'GET'
    function data (serverURL, data) {
        $('#renderCards').html(`<h1>Loading...</h1>`);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        $.holdReady( false );
        return fetch(serverURL, options)
            .then(data => data.json())
            // .then(data => data)
            .catch(console.error);
    }

    // make cards?
    function renderData() {
        // $('#renderCards').html("")
        let html = "";
        data(serverURL).then(function (data) {
            console.log(data)
            data.forEach((movie, index) => {
                html += `<div class="row row-cols-1 row-cols-md-2">
                      <div class="col mb-4">
                        <div class="card">
                          <img src="img/stock-image.jpeg" class="card-img-top movie-image" alt="stock-image">
                          <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">*ENTER DESCRIPTION HERE*</p>
                            <span>Rating: ${movie.rating}</span>
                            <br>
                            <button class="edit-btn" data-id="${movie.id}">Edit Me!</button>
                            <button class="delete-btn" data-id="${movie.id}">Delete Me!</button>
                          </div>
                        </div>
                      </div>
                    </div>`
            })
        }).then(() => {
                $("#renderCards").replaceWith(html)
            });
    }

    renderData();

    // Add movies?---------------------------------

    $("#add-movie-btn").click(function (e) {
        e.preventDefault();
        let newAddition = {
            title: $("#added-movie-title").val(),
            rating: $("#added-movie-rating").val()
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddition)
        };
    return fetch(serverURL, options)
            .then(renderData)
            .catch(console.error);
    });

    // Edit movies?--------------------------------

    function editMovie (ID) {
        fetch(`${serverURL}/${ID}`,
            {method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                // body: JSON.stringify({
                //     title: $(this).title.value,
                //     rating: $(this).rating.value
                // })
            })
            .then(data => console.log('Edit Movie', data));
    }

    $(document).on('click', '.edit-btn', function (e) {
        e.preventDefault();
        let selectedBttn = $(this).attr('data-id');
        console.log(selectedBttn);
        editMovie(selectedBttn);
    });

    // data.forEach( movie => {
    //    $("#movie-dropdown").html(`<option data-dropdown="${movie.id}">${movie.title}</option>`)
    // });

    // $("#edit-movie-title").val($(this).data.title)

    // Delete Movies?

    function deleteMovie (ID) {
        fetch(`${serverURL}/${ID}`,
            {method: "DELETE"})
            .then(data => console.log('Delete Movie', data));
    }

    $(document).on('click', '.delete-btn', function (e) {
        e.preventDefault();
        let selectedBttn = $(this).attr('data-id');
        deleteMovie(selectedBttn);
        // setTimeout(renderData, 1500);
    });


    // GET all movies?
    // data(serverURL)
    //     .then(data => console.log(data));

    // GET single movie?
    // function getMovie (ID) {
    //     data(`${serverURL}/${ID}`)
    //         .then(data => console.log('This specific movie', data));
    // }

});
