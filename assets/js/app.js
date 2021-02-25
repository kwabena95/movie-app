
const tabs = document.querySelectorAll('.menu-items')
const contents = document.querySelectorAll('.content');
const section = document.querySelector('.main');
const movieContainer = document.querySelector('.movies');

const API_KEY = '4fb1298fc0a39cf1bc75ce5b8dbaca5d';

// switch between contents
const switchContent = (e) => {

    // get data-id
    let dataID = e.target.dataset.id;

    // check for data id
    if (dataID) {
        // loop through tabs
        tabs.forEach(tab => {
            // remove current class
            tab.classList.remove('current');
        });
        // add current class
        e.target.classList.add('current');

        contents.forEach(content => {
            content.classList.remove('current');
        });

        e.target.classList.add('current');

        // match ids
        const match = document.getElementById(dataID)
        match.classList.add('current');
    }
};

// fetch movies
const getDiscoverMovies = async () => {

    const URL = 'https://api.themoviedb.org/3/discover/movie?';
    const response = await fetch(`${URL}api_key=${API_KEY}`);
    const data = await response.json();

    let output = '';
    const dicoverContainer = document.querySelector('#discover');
    //loop through data
    data.results.forEach(movie => {

        const { backdrop_path, genre_ids, title, vote_average } = movie;

        output += `

            <figure class="card">
                <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${title}">
                <span class="ratings">${vote_average}</span>
                <figcaption class="card-info">
                    <h3 class="card-title">${title}</h3>
                    <div class="genres">
                        <p class="genre">${genre_ids.forEach(ratings => {
            console.log('rate:', ratings)
            getGenres(ratings)
        })
            }</p>
                    </div>
                </figcaption>
        </figure>
        
        `

    });
    dicoverContainer.innerHTML = output;
    return dicoverContainer;


};

// genres
const getGenres = async (genreID) => {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list?';
    const response = await fetch(`${URL}api_key=${API_KEY}`);
    const data = await response.json();

    data.genres.forEach(genre => {
        const { id, name } = genre;
        if (genreID === id) {
            return genreID = name
        }

    })
};












function init() {
    section.addEventListener('click', switchContent);
    getDiscoverMovies()
}

init();

