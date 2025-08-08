import Image from "next/image";
import SearchBar from "./components/SearchBar.js";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start pt-24 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-4 mb-6 justify-center">
          Welcome to <span className="text-indigo-300">CineFinder</span>
          <Image
            src="/cinefinderlogo.png"
            width={64}
            height={64}
            alt="CineFinder Logo"
            className="rounded-lg"
          />
        </h1>
        <p className="max-w-2xl text-white/80 mb-8 mx-auto">
          Discover, track, and explore movies.
        </p>
        <SearchBar />
      </section>
    </main>
  );
}