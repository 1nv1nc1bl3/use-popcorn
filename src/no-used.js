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
