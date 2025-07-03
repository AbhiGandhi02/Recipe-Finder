import React, { useState } from 'react';
import { useRecipeContext } from '../../context/RecipeContext';
import { searchRecipes } from '../../services/api';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { dispatch } = useRecipeContext();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const recipes = await searchRecipes(searchTerm);
            dispatch({ type: 'SET_RECIPES', payload: recipes });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;