import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import { useRecipeContext } from '../context/RecipeContext';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { favorites, dispatch } = useRecipeContext();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isFavorite = favorites.some(fav => fav.id === parseInt(id));

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                setLoading(true);
                const data = await getRecipeById(id);

                if (!data) {
                    throw new Error('Recipe not found');
                }

                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: 'REMOVE_FAVORITE',
                payload: parseInt(id)
            });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: recipe
            });
        }
    };

    if (loading) return <div className="container mx-auto px-4 py-12"><Loader /></div>;
    if (error) return (
        <div className="container mx-auto px-4 py-12">
            <ErrorMessage message={error} />
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Go Back
            </button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="h-64 w-full object-cover md:w-64"
                        />
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {recipe.cuisines && recipe.cuisines.length > 0 && recipe.cuisines.map((cuisine, index) => (
                                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {cuisine}
                    </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={toggleFavorite}
                                className={`px-4 py-2 rounded ${
                                    isFavorite
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>

                        <div className="mt-4">
                            <p><span className="font-medium">Ready in:</span> {recipe.readyInMinutes} minutes</p>
                            <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
                            {recipe.healthScore && (
                                <p><span className="font-medium">Health Score:</span> {recipe.healthScore}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>
                  {ingredient.original}
                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 border-t">
                    <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                    <div className="prose max-w-none">
                        {recipe.instructions ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                                className="space-y-4"
                            />
                        ) : (
                            <p className="text-gray-600">No instructions available for this recipe.</p>
                        )}
                    </div>
                </div>

                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
                    <div className="p-6 border-t">
                        <h2 className="text-xl font-semibold mb-4">Step by Step</h2>
                        <ol className="list-decimal list-inside space-y-3 pl-4">
                            {recipe.analyzedInstructions[0].steps.map((step) => (
                                <li key={step.number} className="pl-2">
                                    <span className="font-medium">Step {step.number}:</span> {step.step}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                <div className="p-6 border-t flex justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Back
                    </button>

                    {recipe.sourceUrl && (
                        <a
                            href={recipe.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Original Recipe
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailPage;