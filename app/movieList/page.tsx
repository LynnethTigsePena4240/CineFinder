"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from "react";

type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://movie-database-alternative.p.rapidapi.com/?s=the a&r=json",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
              "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch movie");

        const data = await response.json();
        setMovies(data.Search);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movies) return <p>No movie data found.</p>;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Movie List</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie: Movie) => (
            <article
              key={movie.imdbID}
              className="group rounded-2xl bg-white/5 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition overflow-hidden"
            >
              <div className="p-4">
                <div className="relative mx-auto h-[280px] w-[190px]">
                  <Image
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                    alt={movie.Title}
                    fill
                    sizes="190px"
                    className="rounded-lg object-cover"
                  />
                </div>

                <h2 className="mt-4 text-lg font-semibold">{movie.Title}</h2>
                <p className="mt-1 text-sm text-white/70 line-clamp-3">
                  {/* {movie.description} */}
                </p>

                <Link
                  href={`/movieDetail?id=${movie.imdbID}`}
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