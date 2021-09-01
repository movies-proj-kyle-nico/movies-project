"use strict";

// Glitch API Link: https://groovy-busy-close.glitch.me/movies

// $(document).ready(function () {

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
                               <div class="card mx-2">
                                <img src="img/stock-image.jpeg" class="card-img-top movie-image" alt="stock-image">
                                <div class="card-body">
                                    <h5 class="card-title">${movie.title}</h5>
                                    <p class="card-text">*ENTER DESCRIPTION HERE*</p>
                                    <h5><span>Rating: ${movie.rating}</span></h5>
                                    <br>
<!--                                    <button class="edit-btn" data-id="${movie.id}">Edit Me!</button>-->
                                    <button class="delete-btn btn btn-secondary my-1" data-id="${movie.id}">Delete Me!</button>
                                 </div>
                             </div>
                        </div>`
            })
        }).then(() => {$("#renderCards").replaceWith(html)});
        editMovies();
    }

    renderData();

    // add movie?---------------------------------

    function addBttn () {
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
    }

    $("#add-movie-btn").click(function (e) {
        e.preventDefault();
        addBttn();
    });

    // edit movies?--------------------------------

    function editMovies() {

        data(serverURL).then( function (data) {
            let formHTML = `<select id="edit-movie-rating" class="custom-select" name="edit-rating" disable selected value>`
            data.forEach( function (movie) {
                formHTML += `<option value="${movie.id}">${movie.title}</option>`
            })
            formHTML += `<option hidden disabled selected value> - Select Movie - </option>`
            formHTML += `</select>`
            $('#movie-to-edit').html(formHTML);
        })

    }


    $("#edit-movie-btn").click(function (e) {
        e.preventDefault();
            let editAddition = {}
            editAddition.id = editMovieID,
            editAddition.title = $("#edit-movie-title-movie-title").val(),
            editAddition.ratin = $("#edit-movie-rating-movie-rating").val()

            fetch(`${serverURL}/${editMovieID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editAddition)
            }).then(renderData).then(editMovies)
                .catch(console.error)
    });

    var editMovieID = 0;

    // Delete a Movie?-----------------------------
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
        // console.log(this)
        setTimeout(renderData, 2000);
    });


    //-----------------------------------------------

    $(document).on('change', function () {
        console.log(this.value)
    })


    // GET all movies?
    // data(serverURL)
    //     .then(data => console.log(data));

    // GET single movie?
    // function getMovie (ID) {
    //     data(`${serverURL}/${ID}`)
    //         .then(data => console.log('This specific movie', data));
    // }

// });