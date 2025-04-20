import React, { useEffect } from 'react';
import { useRecipeContext } from '../../context/RecipeContext';
import { getCategories, getRecipesByCategory } from '../../services/api';

const RecipeFilter = () => {
    const { selectedCategory, categories, dispatch } = useRecipeContext();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const data = await getCategories();
                dispatch({ type: 'SET_CATEGORIES', payload: data });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };

        fetchCategories();
    }, [dispatch]);

    const handleCategoryChange = async (e) => {
        const category = e.target.value;
        dispatch({ type: 'SET_CATEGORY', payload: category });

        if (category) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const recipes = await getRecipesByCategory(category);
                dispatch({ type: 'SET_RECIPES', payload: recipes });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Cuisine:
            </label>
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Cuisines</option>
                {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RecipeFilter;