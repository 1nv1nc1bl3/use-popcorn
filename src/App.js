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

const KEY = 'cb1f27af';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchedMovies = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
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
        const timer = setTimeout(fetchedMovies, 500);
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
                        />
                    ) : (
                        <>
                            <WatchedSummary
                                watched={watched}
                                setWatched={setWatched}
                            />
                            <WatchedMoviesList
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
