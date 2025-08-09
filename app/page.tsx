
import Image from "next/image";
import SearchBar from "./components/SearchBar.js";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start pt-24 min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight flex items-center gap-4 mb-6 justify-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Welcome to CineFinder
          <Image
            src="/cinefinderlogo.png"
            width={64}
            height={64}
            alt="CineFinder Logo"
            className="rounded-lg shadow-lg"
          />
        </h1>
        <p className="max-w-2xl text-white/80 mb-8 mx-auto text-lg font-light">
          Discover, track, and explore movies 🎞️
        </p>
        <SearchBar />
      </section>
    </main>
  );
}
