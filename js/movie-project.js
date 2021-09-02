"use strict";

// Glitch API Link: https://groovy-busy-close.glitch.me/movies

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
    let html = "";
    data(serverURL).then(function (data) {
        console.log(data)
        data.forEach((movie) => {
            html += `<div class="col mb-4">
                           <div class="card bg-transparent mx-2 h-100">
                            <img src="${movie.image}" class="card-img-top movie-image" alt="stock-image">
                            <div class="card-body">
                                <h4 class="card-title">${movie.title}</h4>
                                <h5>${movie.year}</h5>
                                <p class="card-text">${movie.description}</p>
                                <h5><span>Rating: ${movie.rating}</span></h5>
                                <br>
                                <button class="delete-btn btn btn-secondary my-1" data-id="${movie.id}">Delete Me!</button>
                             </div>
                         </div>
                    </div>`
        })
    }).then(() => {$("#renderCards").replaceWith(html)});
    editMovies();
}

renderData();

// Add movies?---------------------------------

function addBttn () {
    let newAddition = {
        title: $("#added-movie-title").val(),
        year: $("#added-movie-year").val(),
        rating: $("#added-movie-rating").val(),
        image: $("#added-movie-image").val(),
        description: $("#added-movie-description").val()
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
}

$("#add-movie-btn").click(function (e) {
    e.preventDefault();
    addBttn();
});


// edit movies?--------------------------------

function editMovies() {

    data(serverURL).then( function (data) {
        let formHTML = `<select id="edit-movie-title" class="custom-select" name="edit-rating" disable selected value>`
        data.forEach( function (movie) {
            formHTML += `<option value="${movie.id}">${movie.title}</option>`
        })
        formHTML += `<option hidden disabled selected value> - Select Movie - </option>`
        formHTML += `</select>`
        $('#movie-to-edit').html(formHTML);
    })

}

var editMovieID = 0

$("#edit-movie-btn").click(function (e) {
    e.preventDefault();
        let editAddition = {};
        editAddition.id = editMovieID;
        editAddition.title = $("#edit-movie-title option:selected").text();
        editAddition.year = $("#edit-movie-year").val();
        editAddition.rating = $("#edit-movie-rating").val();
        editAddition.image = $("#edit-movie-image").val();
        editAddition.description = $("#edit-movie-description").val();
    fetch(`${serverURL}/${editAddition.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editAddition)
        }).then(renderData).then(editMovies)
            .catch(console.error)
});

// Delete Movies?--------------------------------

function deleteMovie (ID) {
    fetch(`${serverURL}/${ID}`,
        {method: "DELETE"})
        .then(data => console.log('Delete Movie', data));
}

$(document).on('click', '.delete-btn', function (e) {
    e.preventDefault();
    let selectedBttn = $(this).attr('data-id');
    deleteMovie(selectedBttn);

    console.log(selectedBttn)
    setTimeout(renderData, 2000);

});

$(document).on('change', '#edit-movie-title', function () {
    console.log(this.value);
    let searchEditVal = this.value;
    editMovieID = this.value;

        function editMovieGrab(value) {
            data(`${serverURL}/${value}`)
                .then(function (data) {
                    $("#edit-movie-year").val(data.year)
                    $("#edit-movie-rating").val(data.rating);
                    $("#edit-movie-image").val(data.image);
                    $("#edit-movie-description").val(data.description);
                })
        }
        editMovieGrab(searchEditVal);
});