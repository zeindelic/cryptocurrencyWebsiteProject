// Favorite.js
import React from "react";
import { useFavorites } from '../FavoritesContext';

function FavoriteFunc() {
  const { favorites, coinNames } = useFavorites();

  const favoriteCoins = coinNames.filter((coin) => favorites.includes(coin.uuid));

  return (
    <div>
      <h2>Omiljene kripto valute</h2>
      <ul>
        {favoriteCoins.map((crypto) => (
          <div key={crypto.uuid}>
            {crypto.name}
            
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteFunc;
