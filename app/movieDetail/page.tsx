
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MovieDetail } from "@/app/types";

export default function MovieDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imdbID = searchParams.get("id");

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // --- Watchlist (localStorage) helpers
  useEffect(() => {
    if (!imdbID) return;
    const list = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
    setSaved(list.includes(imdbID));
  }, [imdbID]);

  const toggleWatchlist = () => {
    if (!imdbID || !movie) return;
    const list = JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
    let next: string[];
    if (list.includes(imdbID)) {
      next = list.filter((id) => id !== imdbID);
      setSaved(false);
    } else {
      next = [...list, imdbID];
      setSaved(true);
    }
    localStorage.setItem("watchlist", JSON.stringify(next));
  };

  // --- Data fetch
  useEffect(() => {
    async function fetchMovieDetails() {
      if (!imdbID) {
        setError("No movie selected.");
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

        if (!response.ok) throw new Error("Failed to fetch movie details.");

        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
          setError(data.Error || "Movie not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie details.");
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [imdbID]);

  // --- Friendly empty states
  if (!imdbID) {
    return (
      <main className="movie-details-main">
        <div className="text-center space-y-4">
          <p className="text-white/80">Looks like we didn’t get a movie ID.</p>
          <button
            onClick={() => router.push("/movieList?search=star")}
            className="px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
          >
            Browse Movies
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="movie-details-main">
        <section className="movie-details-section w-full">
          <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-12 gap-8 animate-pulse">
            <div className="md:col-span-4 h-[360px] rounded-xl bg-white/10" />
            <div className="md:col-span-8 space-y-4">
              <div className="h-10 w-2/3 rounded bg-white/10" />
              <div className="flex gap-3">
                <div className="h-8 w-20 rounded-full bg-white/10" />
                <div className="h-8 w-24 rounded-full bg-white/10" />
                <div className="h-8 w-28 rounded-full bg-white/10" />
              </div>
              <div className="h-32 rounded bg-white/10" />
              <div className="h-10 w-48 rounded bg-white/10" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) return <div className="movie-details-main text-red-500">{error}</div>;
  if (!movie) return <div className="movie-details-main">No movie details found.</div>;

  // --- UI
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-20">
        {/* Title block */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 drop-shadow">
            {movie.Title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
            {/* Year / Rated / Genre chips */}
            {movie.Year && (
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm">
                {movie.Year}
              </span>
            )}
            {movie.Rated && (
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm">
                {movie.Rated}
              </span>
            )}
            {movie.Genre && (
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/90 text-sm">
                {movie.Genre}
              </span>
            )}
            {/* IMDb badge */}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <span className="px-3 py-1 rounded-full bg-yellow-400/90 text-black font-semibold text-sm">
                ★ IMDb {movie.imdbRating}
              </span>
            )}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Poster */}
          <div className="md:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-15px_rgba(236,72,153,0.35)]">
              <div className="relative h-[420px] w-full">
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                  alt={movie.Title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 grid grid-cols-1 gap-3">
              <button
                onClick={toggleWatchlist}
                className={`w-full rounded-full px-5 py-3 font-semibold transition
                ${saved
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white"}`}
              >
                {saved ? "✓ In Watchlist" : "＋ Add to Watchlist"}
              </button>

              <button
                onClick={() => router.back()}
                className="w-full rounded-full px-5 py-3 font-semibold bg-white/10 hover:bg-white/15 border border-white/15"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Info panel */}
          <div className="md:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 shadow-[0_20px_80px_-15px_rgba(56,189,248,0.25)]">
              <div className="space-y-4">
                <DetailRow label="Director" value={movie.Director} />
                <DetailRow label="Actors" value={movie.Actors} />
                <DetailRow label="Genre" value={movie.Genre} />
                <DetailRow label="Rated" value={movie.Rated} />
              </div>

              {/* Synopsis */}
              {movie.Plot && movie.Plot !== "N/A" && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">Synopsis</h3>
                  <p className="leading-relaxed text-white/90">{movie.Plot}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Small helper for labeled rows
function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-3">
      <span className="text-white/60 w-28 shrink-0">{label}:</span>
      <h2 className="text-white text-lg font-medium">{value}</h2>
    </div>
  );
}
