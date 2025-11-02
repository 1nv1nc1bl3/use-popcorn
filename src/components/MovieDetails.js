import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Spinner from '../components/Spinner';

const KEY = 'cb1f27af';
export default function MovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    onSetRating,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const {
        Title: title,
        // Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.log(`Error displaying movie`, error);
            } finally {
                setLoading(false);
            }
        };
        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `${title} | usePopcorn App`;
        return function () {
            document.title = 'usePopcorn';
        };
    }, [title]);

    return (
        <div className='details'>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <header>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb Rating
                            </p>
                        </div>
                        <button className='btn-back' onClick={onCloseMovie}>
                            &#10554;
                            {/* &larr; */}
                        </button>
                    </header>
                    <section>
                        <div className='rating'>
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        onSetRating={setUserRating}
                                        maxRating={10}
                                        size={24}
                                    />

                                    {userRating > 0 && (
                                        <button
                                            className='btn-add'
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You have already rated{' '}
                                    <strong>{title}</strong> with{' '}
                                    {watchedUserRating}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>
                            <strong>Starring:</strong> {actors}
                        </p>
                        <p>
                            <strong>Directed by:</strong> {director}
                        </p>
                    </section>
                </>
            )}
        </div>
    );
}
