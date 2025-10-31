import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Box from './components/Box';
import NumResults from './components/NumResults';
import WatchedMoviesList from './components/WatchedMoviesList';
import WatchedSummary from './components/WatchedSummary';

const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
];

const tempWatchedData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const KEY = 'cb1f27af';
const query = 'interstellar';
const api = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedMovies = async () => {
            try {
                const res = await fetch(api);
                const data = await res.json();
                setMovies(data.Search);
                // console.log(data.Search);
            } catch (error) {
                console.log('Error fetching movies', error);
            } finally {
                setLoading(false);
            }
        };
        fetchedMovies();
    }, []);

    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    //     .then((res) => res.json())
    //     .then((data) => setMovies(data.Search));
    return (
        <>
            <Navbar>
                <Search />
                <NumResults movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    <MovieList movies={movies} loading={loading} />
                </Box>

                <Box>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </Box>
            </Main>
        </>
    );
}

/*
function WatchedBox() {
    const [watched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);
    return (
        <div className='box'>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? '–' : '+'}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </>
            )}
        </div>
    );
}
*/

/* passing element as prop */
/* <Box element={<MovieList movies={movies} />} /> */
/* <Box element={<><WatchedSummary watched={watched} /><WatchedMoviesList watched={watched} /></>}/> */
