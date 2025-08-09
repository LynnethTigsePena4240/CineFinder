
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 border-t border-slate-700 mt-12 animate-fade-in">
      <div className="flex justify-center items-center gap-3">
        <p className="text-sm tracking-wider">&copy; 2025 CineFinder🍿.</p>
        <Image src="/cinefinderlogo.png" width={28} height={28} alt="Logo" className="rounded-full border border-pink-500" />
      </div>
    </footer>
  );
}
