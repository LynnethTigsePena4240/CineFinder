"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-amber-700 p-5">
      <div className="flex space-x-8 justify-center">

        <Link className="text-white hover:underline" href="/">Home</Link>
        <Link className="text-white hover:underline" href="/movieList">Movie List</Link>
        <Link className="text-white hover:underline " href="/movieDetail">Movie Detail</Link>
        
      </div>
    </div>
  );
}
