"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/app/types";

export default function MovieList() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "movie";
  const year = searchParams.get("y") || "";
  const type = searchParams.get("type") || "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError("");

      try {
        let apiUrl = `https://movie-database-alternative.p.rapidapi.com/?s=${encodeURIComponent(
          searchTerm
        )}&r=json&page=${page}`;
        if (year) apiUrl += `&y=${year}`;
        if (type) apiUrl += `&type=${type}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
            "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch movies.");

        const data = await response.json();
        if (data.Response === "True" && Array.isArray(data.Search)) {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError("No movies found.");
        }
      } catch (err: any) {
        setError(err.message || "Error fetching movies.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [searchTerm, year, type, page]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <section className="movie-list-container">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-fade-in">
          Movie List
        </h1>

        {isLoading && <p className="text-center text-white/70">Loading movies...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="movie-grid">
              {movies.map((movie) => (
                <div key={movie.imdbID} className="movie-card">
                  <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                    <Image
                      src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                      alt={movie.Title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>

                  <Link
                    href={`/movieDetail?id=${movie.imdbID}`}
                    className="mt-3 block w-full text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:scale-105 transition-transform"
                  >
                    🎬 View Details
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-5 py-2 bg-slate-700 text-white rounded-full hover:bg-slate-600 disabled:opacity-40"
              >
                ⬅ Previous
              </button>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
