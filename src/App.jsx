// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
      setMovies(response.data.docs);
    } catch (error) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />
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
    </div>
  );
};

export default App;
