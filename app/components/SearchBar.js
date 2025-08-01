import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-white placeholder-white/60 shadow-lg outline-none backdrop-blur focus:ring-2 focus:ring-white/50"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">⌘</div>
      </div>
    </div>
  );
};

export default SearchBar;