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
     <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {movie.title}
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-[260px,1fr] gap-8">
          <div className="relative h-[360px] w-[240px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>

          <div className="space-y-3 rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">Movie Info</h2>
            <p><span className="text-white/60">Director:</span> {movie.director}</p>
            <p><span className="text-white/60">Release Year:</span> {movie.releaseYear}</p>
            <p><span className="text-white/60">Runtime:</span> {movie.runtime}</p>
            <p><span className="text-white/60">Genre:</span> {movie.genre}</p>
            <p><span className="text-white/60">Rating:</span> ⭐ {movie.rating}</p>

            <div className="pt-2">
              <h3 className="text-lg font-medium">Synopsis</h3>
              <p className="text-white/80">{movie.description}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;