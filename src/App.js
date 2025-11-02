import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Box from './components/Box';
import NumResults from './components/NumResults';
import WatchedMoviesList from './components/WatchedMoviesList';
import WatchedSummary from './components/WatchedSummary';
import MovieDetails from './components/MovieDetails';
// import { tempWatchedData } from './data';

const KEY = 'cb1f27af';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Functions
    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    // Data Fetching
    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );
                // console.log(res);
                if (!res.ok)
                    throw new Error(
                        'Something went wrong with fetching movies.'
                    );
                const data = await res.json();
                if (data.Response === 'False')
                    throw new Error('Movie not found');
                setMovies(data.Search);
                // console.log(data.Search);
            } catch (err) {
                setError(err.message);
                // console.log('Error fetching movies', err);
            } finally {
                setLoading(false);
            }
        };
        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }
        const timer = setTimeout(fetchMovies, 500);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    //     .then((res) => res.json())
    //     .then((data) => setMovies(data.Search));
    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    <MovieList
                        movies={movies}
                        loading={loading}
                        error={error}
                        onSelectMovie={handleSelectMovie}
                    />
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetails
                            onCloseMovie={handleCloseMovie}
                            selectedId={selectedId}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary
                                watched={watched}
                                setWatched={setWatched}
                            />
                            <WatchedMoviesList
                                onDelete={handleDeleteWatched}
                                watched={watched}
                                setWatched={setWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
