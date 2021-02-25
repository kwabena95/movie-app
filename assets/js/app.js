

const tabs = document.querySelectorAll('.menu-items')
const contents = document.querySelectorAll('.content');
const section = document.querySelector('.main');
const movieContainer = document.querySelector('.movies');

const API_KEY = '4fb1298fc0a39cf1bc75ce5b8dbaca5d';

const movieGenres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];
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
                        <p class="genre">${genre_ids.forEach(genre => {
            getGenres(genre);
            console.log(typeof genre)
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
const getGenres = (genreID) => {

    movieGenres.forEach(genre => {
        const { id, name } = genre;
        if (id === genreID) {
            return name
        }
    })
};


getGenres()










function init() {
    section.addEventListener('click', switchContent);
    getDiscoverMovies()
}

init();

