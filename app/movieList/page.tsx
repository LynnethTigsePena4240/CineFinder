"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Movie } from "@/app/types";

const MovieList = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "movie";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&r=json&page=${page}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
              "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();
        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError("No movies found.");
        }
      } catch (err: any) {
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [searchTerm, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  return (
    <div className="movie-list-container">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">Movie List Page</h1>
      {isLoading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <div className="relative h-[250px] w-full">
                  <Image
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                    alt={movie.Title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold mt-4">{movie.Title}</h2>
                <p className="text-gray-400">{movie.Year}</p>
                <Link href={`/movieDetail?id=${movie.imdbID}`} passHref>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:opacity-50"
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;