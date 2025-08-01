"use client";

import React,{useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
   const pathname = usePathname();
      const linkBase =
    "relative px-3 py-2 text-sm md:text-base font-medium transition";
  const isActive = (path: string) =>
    pathname === path
      ? "text-white"
      : "text-white/80 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-indigo-600/80 via-violet-600/80 to-fuchsia-600/80 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="group">
          <span className="text-white font-extrabold tracking-wide text-2xl md:text-3xl">
            Cine<span className="opacity-90">Finder</span>
          </span>
          <span className="block h-0.5 w-0 bg-white/70 transition-all group-hover:w-full" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className={`${linkBase} ${isActive("/")}`}>
            Home
            {pathname === "/" && (
              <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded bg-white" />
            )}
          </Link>
          <Link
            href="/movieList"
            className={`${linkBase} ${isActive("/movieList")}`}
          >
            Movie List
            {pathname === "/movieList" && (
              <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded bg-white" />
            )}
          </Link>
          <Link
            href="/movieDetail"
            className={`${linkBase} ${isActive("/movieDetail")}`}
          >
            Movie Detail
            {pathname === "/movieDetail" && (
              <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded bg-white" />
            )}
          </Link>
        </div>
      </div>
    </nav>
   
  );
}


