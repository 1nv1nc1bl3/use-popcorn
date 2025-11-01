export default function Search({ query, setQuery }) {
    return (
        <input
            className='search'
            type='text'
            placeholder='Start typing to search for movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
