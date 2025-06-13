import fs from 'fs';
import path from 'path';
import { Movie } from './Movie.js';

const FILE_PATH = path.resolve('./movies.json');

function saveMovies(movies) {
    const data = movies.map(movie => movie.toJSON());
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Movies saved successfully.');
}

function loadMovies() {
    if (!fs.existsSync(FILE_PATH)) {
        console.log('No movie data found. Starting fresh.');
        return [];
    }

    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return data.map(movieData => Movie.fromJSON(movieData));
}

export { saveMovies, loadMovies };