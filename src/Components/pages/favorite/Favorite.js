import React from "react";
import { useFavorites } from '../FavoritesContext';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';

function FavoriteFunc() {
  const { favorites, coinNames, isFavorite, removeFavorite } = useFavorites();

  return (
    <>
      <div className="container">
        <div className="asmirr">
          <div className="names">
            <p className="p">Rank</p>
            <p className="data2"></p>
            <p className="data2">Names</p>
            <p className="data2">Price</p>
            <p className="data2">24hVolume</p>
            <p className="data2">MarketCap</p>
            <p className="data2"></p>
            <p className="data2"></p>
          </div>

          {favorites.length === 0 ? (
            <p>Nemate nijednu omiljenu kripto valutu.</p>
          ) : (
            favorites.map((favoriteUuid) => {
              const favoriteCoin = coinNames.find((coin) => coin.uuid === favoriteUuid);
              if (favoriteCoin) {
                return (
                  <div className="asmir2" key={favoriteCoin.uuid}>
                    <p className="p">{favoriteCoin.rank}</p>
                    <div className="data">
                      <Link to={`/coins/${favoriteCoin.uuid}`}>
                        <img className="ikonica" src={favoriteCoin.iconUrl} alt={favoriteCoin.name} />
                      </Link>
                    </div>
                    <div className="data"><p>{favoriteCoin.name}</p></div>
                    <div className="data">{parseFloat(favoriteCoin.price).toFixed(3)}$</div>
                    <div className="data">
                      <p>{parseFloat(favoriteCoin["24hVolume"].replace("$", "").replace(/,/g, "")).toLocaleString()}$</p>
                    </div>
                    <div className="data">
                      {parseFloat(favoriteCoin.marketCap.replace("$", "").replace(/,/g, "")).toLocaleString()}$
                    </div>
                    <div className="data">
                      <Sparklines data={favoriteCoin.sparkline.map((el) => parseFloat(el))}>
                        <SparklinesLine className="sparkline" color="blue" />
                      </Sparklines>
                    </div>
                    <div className="data">
                      <button
                        className="coin_button_favorite"
                        onClick={() => removeFavorite(favoriteCoin)}
                        style={{ color: isFavorite(favoriteCoin) ? "#ff0000" : "#9ca3af" }}
                      >
                        <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null; // Ako omiljena kripto valuta ne postoji u nizu coinNames, ne prikazujemo je
              }
            })
          )}
        </div>
      </div>
    </>
  );
}

export default FavoriteFunc;
