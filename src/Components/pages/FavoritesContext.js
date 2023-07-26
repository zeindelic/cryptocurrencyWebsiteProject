import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteCoins, setFavoriteCoins] = useState(new Set());

  const addFavorite = (coin) => {
    setFavoriteCoins((prevFavorites) => new Set([...prevFavorites, coin]));
  };

  const removeFavorite = (coin) => {
    setFavoriteCoins((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(coin);
      return newFavorites;
    });
  };

  const isFavorite = (coin) => {
    return favoriteCoins.has(coin);
  };

  const value = {
    favorites: Array.from(favoriteCoins),
    addFavorite,
    removeFavorite,
    isFavorite,
  };
  
  console.log("Favorite Coins:", value.favorites);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
