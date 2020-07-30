document.addEventListener("DOMContentLoaded", function(){
        
    const url = "http://localhost:3000/films"
    const filmsDiv = document.querySelector("#films")
    const posterDiv = document.querySelector("#poster")
    const showingDiv = document.querySelector("#showing")
    const tktsBtn = showingDiv.querySelector('.ui.orange.button')


    getFirstMovie();
    getAllFilms()

    // - See the first movie's details, including its **poster, title, runtime, showtime, 
    //     and available tickets** (the number of tickets left will need to be derived 
    //     from the theater's capacity and the number of tickets sold)

    function getFirstMovie(){
        fetch(url+'/1')
    .then(response => response.json())
    .then(film => renderFilm(film));
    }

    function renderFilm(film){
        posterDiv.dataset.id = film.id
        posterDiv.src = film.poster
        showingDiv.dataset.id = film.id
        showingDiv.dataset.capacity = film.capacity
        showingDiv.dataset.tickets_sold = film.tickets_sold
        showingDiv.querySelector("#title").innerText = film.title
        showingDiv.querySelector("#film-info").innerText = film.description
        showingDiv.querySelector("#runtime").innerText = film.runtime +" Minutes"
        showingDiv.querySelector("#showtime").innerText = film.showtime
        showingDiv.querySelector("#ticket-num").innerText = parseInt(film.capacity) - parseInt(film.tickets_sold)
        if (parseInt(film.capacity)-parseInt(film.tickets_sold)<1){
            tktsBtn.innerText = "Sold Out" 
            tktsBtn.disabled = true
            tktsBtn.className = "sold-out"
        } else {
            tktsBtn.innerText = "Buy Ticket" 
            tktsBtn.disabled = false
            tktsBtn.className = "ui orange button"
        }

    }

    // - Buy a ticket for a movie. The number of tickets sold for that movie should be 
    //     persisted, and I should be able to see the number of available tickets 
    //     decreasing on the frontend.

    tktsBtn.addEventListener('click', function(){
        let id = showingDiv.dataset.id
        let capacity = showingDiv.dataset.capacity
        let tickets_sold = showingDiv.dataset.tickets_sold
        if (parseInt(capacity)-parseInt(tickets_sold)>0){
            tickets_sold = parseInt(tickets_sold)+1
            fetch(url+`/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({tickets_sold: tickets_sold})
            })
            .then(r => r.json())
            .then(film => updateTickets(film))
            function updateTickets(film){
                showingDiv.dataset.tickets_sold = film.tickets_sold
                showingDiv.querySelector("#ticket-num").innerText = parseInt(film.capacity) - parseInt(film.tickets_sold)
                if (parseInt(film.capacity)-parseInt(film.tickets_sold)<1){
                    tktsBtn.innerText = "Sold Out" 
                    tktsBtn.disabled = true
                    tktsBtn.className = "sold-out"
                    // filmDiv.id = film.id
                    // filmDiv.className = "sold-out"
                    // filmDiv.innerText = `${film.title}`
                    // filmListSold.append(filmDiv)
                } 
            }
        }
    })



        // ## Advanced Deliverables:

        // These deliverables are not required to pass the code challenge, but if you have extra time, you should attempt them!  They are a great way to stretch your skills.
        
        // > If you're going to attempt the advanced deliverables, **make sure you have a working commit with all the core deliverables first!**
        
        // As a user, I can:
        
        // - See a menu of all movies on the left side of the page.

    function getAllFilms(){
        fetch(url)
    .then(response => response.json())
    .then(films => renderAllFilms(films));
    }


    function renderAllFilms(films){
        const filmList = filmsDiv.children[0]
        filmList.innerText = ""
        const filmListSold = filmsDiv.children[1]
        filmListSold.innerText = "~Sold Out~"

        films.forEach(film =>{
            let filmDiv = document.createElement('div')
            if(parseInt(film.capacity)-parseInt(film.tickets_sold)>1){
            filmDiv.className = "film" 
            filmDiv.id = film.id 
            filmDiv.innerText = `${film.title}`
            filmList.append(filmDiv)
            } else {
            filmDiv.id = film.id
            filmDiv.className = "sold-out"
            filmDiv.innerText = `${film.title}`
            filmListSold.append(filmDiv)
            }
            
        })
    }

        // - Click on a movie in the menu to replace the currently displayed movie's details with the new movie's details.

    filmsDiv.addEventListener('click', function(e){

        let id = e.target.id
        fetch(url+`/${id}`)
        .then(response => response.json())
        .then(film => renderFilm(film));
    })

        // - Buy a ticket for any movie and update the tickets sold for that movie, not just the first.
            //done above

        // - Indicate in the menu which movies are sold out.

        
        // ![Example](assets/flatdangoDemo.gif)
        
        // ## Styling
        
        // [Semantic Ui](https://semantic-ui.com/elements/list.html) is loaded into this project via a `link` tag in the `head` of the html. Some extra styling is also included in `assets/index.css`. Styling is built in for the base deliverables.
        
        // Styling for advanced deliverables:
        
        // The listed films should be added to the div with an id of `films`.  Here is sample styling for the film list items:
        
        // ```html
        //   <div class="film item">(Title of film)</div>
        //   <div class="sold-out film item">(Title of a sold-out film)</div>
        //   <div class="film item">(Title of film)</div>
        // ```


});

