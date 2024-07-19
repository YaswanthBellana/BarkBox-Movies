import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieCard = ({ title, author, publicationDate }) => {
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(response.data.message);
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <div className="movie-card">
      <img src={dogImage} alt="Random dog" />
      <div className='container2'>
        <h2 className='hello'>{title}</h2>
        <p className='hellop'>Author: {author}</p>
        <p className='hellop'>Published: {publicationDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
