import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 p-4 border-t border-slate-800">
        <p>&copy; 2025 CineFinder </p>
        <Image
          src="/cinefinderlogo.png"
          width={30}
          height={30}
          alt="CineFinder Logo"
          className="rounded-lg"
        />
      </div>
    </footer>
  );
}