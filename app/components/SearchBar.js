
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/movieList?search=${searchTerm}`;
    if (year) query += `&y=${year}`;
    if (type) query += `&type=${type}`;
    router.push(query);
  };

  return (
    <div className="mt-10 flex justify-center w-full animate-fade-in">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center w-full max-w-3xl px-4">
        <input
          type="text"
          placeholder="Search your favorite movie..."
          className="w-full md:w-2/5 px-6 py-4 bg-black text-white placeholder-white/50 border border-pink-500 rounded-full outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/5 px-5 py-4 bg-black text-white border border-pink-500 rounded-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" disabled>Year</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select
          className="w-full md:w-1/5 px-5 py-4 bg-black text-white border border-pink-500 rounded-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>Type</option>
          <option value="movie">Movie</option>
          <option value="series">TV Show</option>
        </select>
        <button type="submit" className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 hover:shadow-xl transition-all">
          🔎 Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
