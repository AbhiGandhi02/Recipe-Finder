import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getStoredFavorites, storeFavorites } from "../utils/localStorage";

// Initial state
const initialState = {
    recipes: [],
    favorites: [],
    selectedCategory: "",
    categories: [],
    isLoading: false,
    error: null
};

// Create context
const RecipeContext = createContext(initialState);

// Reducer function
const recipeReducer = (state, action) => {
    switch (action.type) {
        case "SET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                isLoading: false
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                isLoading: false
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case "SET_CATEGORY":
            return {
                ...state,
                selectedCategory: action.payload
            };
        case "ADD_FAVORITE":
            const updatedFavorites = [...state.favorites, action.payload];
            storeFavorites(updatedFavorites);
            return {
                ...state,
                favorites: updatedFavorites
            };
        case "REMOVE_FAVORITE":
            const filteredFavorites = state.favorites.filter(
                (recipe) => recipe.id !== action.payload
            );
            storeFavorites(filteredFavorites);
            return {
                ...state,
                favorites: filteredFavorites
            };
        case "LOAD_FAVORITES":
            return {
                ...state,
                favorites: action.payload
            };
        default:
            return state;
    }
};

// Provider component
export const RecipeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipeReducer, initialState);

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const favorites = getStoredFavorites();
        if (favorites.length) {
            dispatch({ type: "LOAD_FAVORITES", payload: favorites });
        }
    }, []);

    // Context value
    const value = {
        recipes: state.recipes,
        favorites: state.favorites,
        selectedCategory: state.selectedCategory,
        categories: state.categories,
        isLoading: state.isLoading,
        error: state.error,
        dispatch
    };

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
};

// Custom hook for using the recipe context
export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (context === undefined) {
        throw new Error('useRecipeContext must be used within a RecipeProvider');
    }
    return context;
};