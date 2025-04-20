import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeContext } from '../../context/RecipeContext';

const RecipeCard = ({ recipe }) => {
    const { favorites, dispatch } = useRecipeContext();

    // Check if the recipe is in favorites
    const isFavorite = favorites.some(fav => fav.id === recipe.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: 'REMOVE_FAVORITE',
                payload: recipe.id
            });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: recipe
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.cuisines && recipe.cuisines.length > 0 && (
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Cuisine:</span> {recipe.cuisines.join(', ')}
                        </p>
                    )}
                    {recipe.dishTypes && recipe.dishTypes.length > 0 && (
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Dish:</span> {recipe.dishTypes[0]}
                        </p>
                    )}
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Ready in:</span> {recipe.readyInMinutes} minutes
                    </p>
                </div>
                <div className="flex justify-between mt-4">
                    <Link
                        to={`/recipe/${recipe.id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={toggleFavorite}
                        className={`text-sm px-3 py-1 rounded ${
                            isFavorite
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        }`}
                    >
                        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;