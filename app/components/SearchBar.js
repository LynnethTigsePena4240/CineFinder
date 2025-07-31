import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;