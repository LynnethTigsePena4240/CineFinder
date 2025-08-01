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
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Movie List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <article
              key={movie.id}
              className="group rounded-2xl bg-white/5 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition overflow-hidden"
            >
              <div className="p-4">
                <div className="relative mx-auto h-[280px] w-[190px]">
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    fill
                    sizes="190px"
                    className="rounded-lg object-cover"
                  />
                </div>

                <h2 className="mt-4 text-lg font-semibold">{movie.title}</h2>
                <p className="mt-1 text-sm text-white/70 line-clamp-3">
                  {movie.description}
                </p>

                <Link
                  href={`/movieDetail?id=${movie.id}`}
                  className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  View Details
                </Link>
              </div>
              <div className="h-1 w-0 bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 transition-all group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieList;