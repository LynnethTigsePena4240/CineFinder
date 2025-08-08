"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            router.push(`/movieList?search=${searchTerm}`);
        } else {
            router.push(`/movieList`);
        }
    };

    return (
        <div className="mt-8 flex justify-center w-full">
            <form onSubmit={handleSearch} className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="w-[500px] px-5 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-blue-500 focus:shadow-md transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;