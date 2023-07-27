import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./asmir.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useFavorites } from '../FavoritesContext';
import { Link } from "react-router-dom";


const CoinsFunc = () => {
  const [coinNames, setCoinNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coinsPerPage = 20;

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
      setCoinNames(response.data.data.coins.map((coin) => coin));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredCoins = coinNames.filter((coin) =>
    coin.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = (coin) => {
    if (isFavorite(coin)) {
      removeFavorite(coin);
    } else {
      addFavorite(coin);
    }
  };

  return (
    <div className="container">
      <div>
        <input className="input_coins" placeholder="Search cryptos" value={searchTerm} onChange={handleSearch} />
      </div>

      <div className="asmir">
        <div className="names">
          <p className="p">Rank</p>
          <p className="data1"></p>
          <p className="data1">Names</p>
          <p className="data1">Price</p>
          <p className="data1">24hVolume</p>
          <p className="data1">MarketCap</p>
          <p className="data1"></p>
        </div>

        {filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin).map((coin, index) => (
          <div className="asmir2" key={index}>
            <p className="p">{coin.rank}</p>
            <div className="data">
            <Link to={`/coins/${coin.uuid}`}> 
              <img className="ikonica" src={coin.iconUrl} alt={coin.name} />
              </Link>
            </div>
            <div className="data"><p>{coin.name}</p></div>
            <div className="data">{parseFloat(coin.price).toFixed(3)}$</div>
            <div className="data">
              <p>{parseFloat(coin["24hVolume"].replace("$", "").replace(/,/g, "")).toLocaleString()}$</p>
            </div>
            <div className="data">
              {parseFloat(coin.marketCap.replace("$", "").replace(/,/g, "")).toLocaleString()}$
            </div>
            <div className="data">
              <Sparklines data={coin.sparkline.map((el) => parseFloat(el))}>
                <SparklinesLine className="sparkline" color="blue" />
              </Sparklines>
            </div>
            <button
              className="coin_button_favorite"
              onClick={() => handleFavoriteClick(coin)}
              style={{ color: isFavorite(coin) ? "#ff0000" : "#9ca3af" }}
            >
              <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
            </button>
          </div>
        ))}

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredCoins.length / coinsPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default CoinsFunc;
