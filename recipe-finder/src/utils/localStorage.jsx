export const getStoredFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const storeFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};