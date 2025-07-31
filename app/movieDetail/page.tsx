import React from 'react';
import Image from 'next/image';

const movie = { // Sample movie data for details page until we can fetch from an API
  id: 1,
  title: 'The Dark Knight',
  description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The caped crusader must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  director: 'Christopher Nolan',
  releaseYear: 2008,
  runtime: '152 min',
  genre: 'Action, Crime, Drama',
  rating: '9.0/10',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
};

const MovieDetails = () => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>{movie.title}</h1>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <Image 
          src={movie.imageUrl} 
          alt={movie.title} 
          width={200} 
          height={300} 
          style={{ borderRadius: '8px' }} 
        />
        <div>
          <h2>Movie Info</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <h3>Synopsis</h3>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;