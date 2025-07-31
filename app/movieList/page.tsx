import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const movies = [ // Sample movie data for the list page until we can fetch from an API
  {
    id: 1,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 2,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  },
  {
    id: 3,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
];

const MovieList = () => {
  return (
    <div className="movie-list-container">
      <h1>Movie List</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Image 
              src={movie.imageUrl} 
              alt={movie.title} 
              width={150} 
              height={225} 
              style={{ borderRadius: '8px' }} 
            />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <Link href={`/moviedetails?id=${movie.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;