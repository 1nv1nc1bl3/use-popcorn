import { ClipLoader } from 'react-spinners';
import Movie from './Movie';

export default function MovieList({ movies, loading }) {
    return (
        <ul className='list'>
            {loading ? (
                // <h2 style={{ color: '#fff' }}>Loading...</h2>
                <ClipLoader />
            ) : (
                movies?.map((movie) => (
                    <Movie movie={movie} key={movie.imdbID} />
                ))
            )}
        </ul>
    );
}
