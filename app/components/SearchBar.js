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

        if (year) {
            query += `&y=${year}`;
        }
        if (type) {
            query += `&type=${type}`;
        }

        router.push(query);
    };

    return (
        <div className="mt-8 flex justify-center w-full">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center w-full max-w-2xl px-4">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="w-full md:w-2/4 px-5 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-white transition bg-slate-900 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full md:w-1/4 px-5 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-white transition bg-slate-900 text-white"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="" disabled className="text-white">Year</option>
                    {years.map((y) => (
                        <option key={y} value={y} className="text-white bg-slate-900">{y}</option>
                    ))}
                </select>
                <select
                    className="w-full md:w-1/4 px-5 py-3 border border-gray-300 rounded-full text-base outline-none focus:border-white transition bg-slate-900 text-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="" disabled className="text-white">Type</option>
                    <option value="movie" className="text-white bg-slate-900">Movie</option>
                    <option value="series" className="text-white bg-slate-900">TV Show</option>
                </select>
                <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;