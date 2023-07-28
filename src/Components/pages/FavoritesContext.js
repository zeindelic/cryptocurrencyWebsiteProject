import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteCoins, setFavoriteCoins] = useState(new Set());
  const [coinNames, setCoinNames] = useState([]);

  useEffect(() => {
    fetchCoinsData();
  }, []);

  const fetchCoinsData = async () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "300",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": "504beda31amsh83ca0de5b65ab99p1f8d59jsne12d84eb16c1",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const coinsData = response.data.data.coins.map((coin) => coin);
      setCoinNames(coinsData);
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = (coin) => {
    setFavoriteCoins((prevFavorites) => new Set([...prevFavorites, coin.uuid]));
  };

  const removeFavorite = (coin) => {
    setFavoriteCoins((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(coin.uuid);
      return newFavorites;
    });
  };

  const isFavorite = (coin) => {
    return favoriteCoins.has(coin.uuid);
  };

  const value = {
    favorites: Array.from(favoriteCoins),
    addFavorite,
    removeFavorite,
    isFavorite,
    coinNames,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
