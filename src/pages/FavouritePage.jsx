import React from 'react';
import Header from '../components/layout/Header';
import RecipeList from '../components/recipe/RecipeList';
import { useRecipeContext } from '../context/RecipeContext';

const FavoritesPage = () => {
    const { favorites } = useRecipeContext();

    return (
        <div className="container mx-auto px-4 py-8">
            <Header
                title="Your Favorite Recipes"
                subtitle="All your saved recipes in one place"
            />

            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">You haven't added any favorites yet.</p>
                    <p className="mt-2">Search for recipes and add them to your favorites to see them here!</p>
                </div>
            ) : (
                <RecipeList recipes={favorites} />
            )}
        </div>
    );
};

export default FavoritesPage;