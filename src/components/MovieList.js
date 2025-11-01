import Spinner from './Spinner';
import Movie from './Movie';

export default function MovieList({ movies, loading, error }) {
    const ErrorMessage = ({ message }) => {
        return <p className='error'>{message}</p>;
    };

    return (
        <ul className='list'>
            {loading && <Spinner />}
            {!loading &&
                !error &&
                movies?.map((movie) => (
                    <Movie movie={movie} key={movie.imdbID} />
                ))}
            {error && <ErrorMessage message={error} />}
        </ul>
    );
}
