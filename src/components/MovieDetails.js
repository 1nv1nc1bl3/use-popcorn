import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import Spinner from '../components/Spinner';

const KEY = 'cb1f27af';
const MovieDetails = ({ selectedId, onCloseMovie }) => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [movieRating, setMovieRating] = useState(0);

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

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
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
                            &larr;
                        </button>
                    </header>
                    <section>
                        <div className='rating'>
                            <StarRating
                                onSetRating={setMovieRating}
                                maxRating={10}
                                size={24}
                                movieRating={movieRating}
                                setMovieRating={setMovieRating}
                            />
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
};

export default MovieDetails;
