import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Captcha from './components/Captcha';
import MovieSearch from './components/MovieSearch';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Captcha />} />
      <Route path="/movieSearch" element={<MovieSearch />} />
    </Routes>
  );
};

export default App;
