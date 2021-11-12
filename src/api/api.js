const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '00fbfc6f4399f5a243bc1d1edced10ce';

function API(url = '', config = {}) {
    return fetch(url, config)
    .then(res => {
        if (res.ok ){
            return res.json('');
        }

        return Promise.reject(new Error('Данных не найдено'));
    });
}

export function fetchPopularMovies() {
    return API(`${BASE_URL}/3/trending/movie/week?api_key=${API_KEY}`);
}

export function fetchMovies(value) {
    return API(`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${value}`);
}
