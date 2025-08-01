import Image from "next/image";
import styles from "./page.module.css";
import SearchBar from "./components/SearchBar.js";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-indigo-300">CineFinder</span>
          </h1>
          <Image
            src="/cinefinderlogo.png"
            width={64}
            height={64}
            alt="CineFinder Logo"
            className="rounded-lg"
          />
        </div>

        <p className="max-w-2xl text-white/80 mb-8">
          Discover, track, and explore movies.
        </p>

        <SearchBar />
      </section>
    </main>
  );
}