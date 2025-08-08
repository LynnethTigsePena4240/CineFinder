"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MovieDetail } from "@/app/types";

const MovieDetails = () => {
  const searchParams = useSearchParams();
  const imdbID = searchParams.get("id");

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!imdbID) {
        setError("No movie ID provided.");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://movie-database-alternative.p.rapidapi.com/?i=${imdbID}&r=json`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
              "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
          setError(data.Error);
        }
      } catch (err: any) {
        setError(err.message);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [imdbID]);

  if (isLoading) {
    return <div className="movie-details-main">Loading...</div>;
  }

  if (error) {
    return <div className="movie-details-main">{error}</div>;
  }

  if (!movie) {
    return <div className="movie-details-main">No movie details found.</div>;
  }

  return (
    <main className="movie-details-main">
      <section className="movie-details-section">
        <h1 className="movie-details-title text-center">{movie.Title}</h1>

        <div className="movie-details-content">
          <div className="movie-details-image-container">
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              fill
              className="movie-details-poster"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="movie-details-info">
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">Year:</span> {movie.Year}
              </h2>
            </div>
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">Rated:</span> {movie.Rated}
              </h2>
            </div>
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">Genre:</span> {movie.Genre}
              </h2>
            </div>
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">Director:</span> {movie.Director}
              </h2>
            </div>
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">Actors:</span> {movie.Actors}
              </h2>
            </div>
            <div className="info-item">
              <h2 className="info-title">
                <span className="info-label">IMDB Rating:</span> {movie.imdbRating}
              </h2>
            </div>
            <div className="synopsis-container">
              <h3 className="synopsis-title">Synopsis</h3>
              <p className="synopsis-text">{movie.Plot}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;