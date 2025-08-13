// app/watchList/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type movie = { // 
  imdbID: string;
  Title: string;
  Year?: string;
  Poster?: string;
};

function getIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("watchlist") || "[]") as string[];
  } catch {
    return [];
  }
}

function setIds(ids: string[]) {
  localStorage.setItem("watchlist", JSON.stringify(ids));
  // notify Navbar and this page in other tabs
  window.dispatchEvent(new Event("watchlist-updated"));
}

export default function WatchlistPage() {
  const [ids, setLocalIds] = useState<string[]>([]);
  const [items, setItems] = useState<movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load IDs and stay in sync with changes from other tabs/pages
  useEffect(() => {
    const load = () => setLocalIds(getIds());
    load();

    const onUpdate = () => load();
    window.addEventListener("storage", onUpdate);
    window.addEventListener("watchlist-updated", onUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("watchlist-updated", onUpdate as EventListener);
    };
  }, []);

  // Fetch movie details for all IDs
  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            const url = `https://movie-database-alternative.p.rapidapi.com/?i=${encodeURIComponent(
              id
            )}&r=json`;
            const res = await fetch(url, {
              method: "GET",
              headers: {
                "x-rapidapi-key": "3f684cd8damsh544f983b21f5aedp1c4cc8jsnbd6cbd245270",
                "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
              },
              cache: "no-store",
            });
            if (!res.ok) throw new Error(`Failed for ${id}`);
            const data = await res.json();
            if (data?.Response === "False") return null;
            return {
              imdbID: data.imdbID as string,
              Title: (data.Title as string) || "Untitled",
              Year: data.Year as string | undefined,
              Poster: data.Poster as string | undefined,
            } as movie;
          })
        );
        if (!cancelled) {
          setItems((results.filter(Boolean) as movie[]));
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (ids.length) fetchAll();
    else {
      setItems([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [ids]);

  const removeOne = (id: string) => {
    const next = ids.filter((x) => x !== id);
    setLocalIds(next);
    setIds(next);
  };

  const clearAll = () => {
    setLocalIds([]);
    setIds([]);
  };

  const count = ids.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-20 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 drop-shadow">
            Your Watchlist
          </h1>
          {count > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-full font-semibold bg-white/10 hover:bg-white/15 border border-white/15"
            >
              Clear all
            </button>
          )}
        </div>

        {loading ? (
          // Skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-3">
                <div className="h-64 w-full bg-white/10 rounded-xl" />
                <div className="h-4 w-2/3 bg-white/10 rounded mt-3" />
                <div className="h-4 w-1/3 bg-white/10 rounded mt-2" />
                <div className="h-9 w-24 bg-white/10 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : count === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-white/80">No movies yet.</p>
            <Link
              href="/movieList?search=star"
              className="inline-block px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white"
            >
              Find something to add
            </Link>
          </div>
        ) : items.length === 0 ? (
          <p className="text-white/80">
            Your list has {count} ID{count > 1 ? "s" : ""}, but we couldn’t load details. Try again in a moment.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((m) => (
              <li
                key={m.imdbID}
                className="border border-white/10 rounded-2xl p-3 bg-white/5 backdrop-blur shadow-[0_20px_80px_-15px_rgba(56,189,248,0.25)]"
              >
                <Link href={`/movieDetail?id=${m.imdbID}`} className="block group">
                  <div className="relative w-full h-64 overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={m.Poster && m.Poster !== "N/A" ? m.Poster : "/placeholder.png"}
                      alt={m.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold group-hover:underline">{m.Title}</h3>
                  {m.Year && <p className="text-white/70 text-sm">{m.Year}</p>}
                </Link>

                <div className="mt-3">
                  <button
                    onClick={() => removeOne(m.imdbID)}
                    className="px-3 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
