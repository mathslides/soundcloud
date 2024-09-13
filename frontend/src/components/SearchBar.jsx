

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSongs } from '../store/songs';
import _ from 'lodash';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    // Step 1: Create a debounced version of your search function
    const debouncedSearch = _.debounce(async (options) => {
        try {
            const data = await dispatch(getAllSongs(options));
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }, 1000); // 300ms debounce delay

    // Step 2: Handle search input changes
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        // Step 3: Use the debounced function to handle the search
        let options = { searchTerm: value };
        options = _.omitBy(options, _.isNil);
        debouncedSearch(options);
    };

    // Step 4: Cleanup debounced function on component unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center rounded-full">
                <div className="relative w-full">
                    <input
                        type="search"
                        name="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-3 bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full pl-8 dark:bg-gray-800 dark:text-gray-200"
                        placeholder="Search..."
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                        {/* Add any button content or icon here */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;

