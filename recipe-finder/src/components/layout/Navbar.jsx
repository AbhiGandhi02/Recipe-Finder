import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Recipe Finder</h1>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "font-medium border-b-2 border-white" : "hover:opacity-80"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive ? "font-medium border-b-2 border-white" : "hover:opacity-80"
                            }
                        >
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;