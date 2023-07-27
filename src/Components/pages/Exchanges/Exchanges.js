import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Exchanges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useFavorites } from '../FavoritesContext';
import { Link } from "react-router-dom";


const ExchangesFunc = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coinsPerPage = 10;

  useEffect(() => {
    fetchCoinsData();
  }, []);

  const fetchCoinsData = async () => {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        limit: '50',
        offset: '0',
        orderBy: '24hVolume',
        orderDirection: 'desc'
      },
      headers: {
        "X-RapidAPI-Key": "504beda31amsh83ca0de5b65ab99p1f8d59jsne12d84eb16c1",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      setExchanges(response.data.data.exchanges.map((exchange) => exchange));
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

  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

 
 

  return (
    <div className="container">
      <div className="asmir">


        

        {filteredExchanges.slice(indexOfFirstCoin, indexOfLastCoin).map((coin, index) => (
          <div className="asmir2" key={index}>
            <div className="smallerDivInAsmir2">
                <div className="imgRankNameDiv">
            <div className="data">
              <img className="ikonica" src={coin.iconUrl} alt={coin.name} />
            </div>
            <p className="p">{coin.rank}</p>
            <div className="data"><p>{coin.name}</p></div>
            </div>
            <div className="data">{parseFloat(coin.price).toFixed(3)}$</div>
           
                <a className="coinOpenExchange"
                      href={coin.coinrankingUrl}
                      rel="noreferrer"
                      target="_blank"
                    > 
                    Open Exchange
                    </a>
               
            </div>
          </div>
        ))}

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredExchanges.length / coinsPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ExchangesFunc;
