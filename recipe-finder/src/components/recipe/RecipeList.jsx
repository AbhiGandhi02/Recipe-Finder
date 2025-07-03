import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
    if (!recipes || recipes.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">No recipes found. Try a different search term.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;