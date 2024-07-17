"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className='h-20 p-4 shadow-md'>
            <div className='flex justify-between items-center'>
                <div className="logo">Logo</div>
                <div className="navigation flex gap-12">
                    <div className="nav-item"><Link href={'/'}>Home</Link></div>
                    <div className="nav-item">Recipes</div>
                    <div className="nav-item">About</div>
                    <div className="nav-item">Contact</div>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

