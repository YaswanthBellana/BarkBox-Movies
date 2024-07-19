import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * 16;
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}&offset=${offset}&limit=16`);
      setMovies(response.data.docs);
    } catch (error) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [page, query]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearchSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-cards-container">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.key} 
            title={movie.title} 
            author={movie.author_name?.[0] || 'Unknown'} 
            publicationDate={movie.first_publish_year || 'N/A'} 
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default MovieSearch;
