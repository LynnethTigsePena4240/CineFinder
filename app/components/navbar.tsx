
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) =>
    pathname === path ? "text-cyan-300" : "text-white/70 hover:text-white";

  const handleRandomMovieClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://movie-database-alternative.p.rapidapi.com/?s=movie&r=json`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
            "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      if (data.Response === "True" && data.Search) {
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        const randomMovie = data.Search[randomIndex];
        router.push(`/movieDetail?id=${randomMovie.imdbID}`);
      }
    } catch (err) {
      console.error("Error fetching a random movie:", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-90 shadow-xl backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse">
          🎬 CineFinder
        </Link>
        <div className="flex gap-6 text-lg font-semibold">
          <Link href="/" className={`transition duration-300 ${isActive("/")}`}>Home</Link>
          <Link href="/movieList" className={`transition duration-300 ${isActive("/movieList")}`}>Movies</Link>
          <a href="/movieDetail" onClick={handleRandomMovieClick} className={`transition duration-300 ${isActive("/movieDetail")}`}>Random</a>
          <Link href="/watchlist" className={`transition duration-300 ${isActive("/watchlist")}`}>Watchlist</Link>
        </div>
      </div>
    </nav>
  );
}
