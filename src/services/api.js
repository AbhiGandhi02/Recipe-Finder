import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com';

const API_KEY = '97ff75ecad6a46618818a87b3b07c23d';


const addApiKey = (url) => {
    return `${url}${url.includes('?') ? '&' : '?'}apiKey=${API_KEY}`;
};

export const searchRecipes = async (query) => {
    try {
        const response = await axios.get(addApiKey(`${BASE_URL}/recipes/complexSearch`), {
            params: {
                query,
                number: 12,
                addRecipeInformation: true,
                fillIngredients: true
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Search error:', error);
        throw new Error('Failed to fetch recipes');
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(
            addApiKey(`${BASE_URL}/recipes/${id}/information`),
            {
                params: {
                    includeNutrition: false
                }
            }
        );
        return response.data || null;
    } catch (error) {
        console.error('Get recipe error:', error);
        throw new Error('Failed to fetch recipe details');
    }
};

export const getCategories = async () => {
    try {
        // Spoonacular uses cuisines, meal types, and diets instead of categories
        const response = await axios.get(addApiKey(`${BASE_URL}/recipes/cuisines`));
        return response.data.map(cuisine => ({ name: cuisine })) || [];
    } catch (error) {
        // Fallback to hardcoded cuisines if the API call fails
        console.error('Categories error:', error);
        const cuisines = [
            "African", "American", "British", "Cajun", "Caribbean",
            "Chinese", "Eastern European", "European", "French", "German",
            "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
            "Korean", "Latin American", "Mediterranean", "Mexican",
            "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
        ];
        return cuisines.map(cuisine => ({ name: cuisine }));
    }
};

export const getRecipesByCategory = async (category) => {
    try {
        const response = await axios.get(addApiKey(`${BASE_URL}/recipes/complexSearch`), {
            params: {
                cuisine: category,
                number: 12,
                addRecipeInformation: true
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Category filter error:', error);
        throw new Error('Failed to fetch recipes by category');
    }
};

export const getRandomRecipes = async () => {
    try {
        const response = await axios.get(addApiKey(`${BASE_URL}/recipes/random`), {
            params: {
                number: 12
            }
        });
        return response.data.recipes || [];
    } catch (error) {
        console.error('Random recipes error:', error);
        throw new Error('Failed to fetch random recipes');
    }
};