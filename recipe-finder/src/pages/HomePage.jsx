import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import SearchBar from '../components/recipe/SearchBar';
import RecipeFilter from '../components/recipe/RecipeFilter';
import RecipeList from '../components/recipe/RecipeList';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useRecipeContext } from '../context/RecipeContext';
import { getRandomRecipes } from '../services/api';

const HomePage = () => {
    const { recipes, isLoading, error, dispatch } = useRecipeContext();

    useEffect(() => {
        const fetchInitialRecipes = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                // Fetch random recipes as initial content
                const data = await getRandomRecipes();
                dispatch({ type: 'SET_RECIPES', payload: data });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };

        fetchInitialRecipes();
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Header
                title="Recipe Finder"
                subtitle="Search for delicious recipes from around the world"
            />
            <div className="max-w-4xl mx-auto">
                <SearchBar />
                <RecipeFilter />

                {error && <ErrorMessage message={error} />}
                {isLoading ? <Loader /> : <RecipeList recipes={recipes} />}
            </div>
        </div>
    );
};

export default HomePage;