export default function Movie({ movie, onSelectMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            {movie.Poster ? (
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
                <span>no poster</span>
            )}
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>📅</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
