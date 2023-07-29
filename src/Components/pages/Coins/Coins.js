import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useFavorites } from '../FavoritesContext';
import CalcModal from "../../calcModal/calcmodal";
import { Link } from "react-router-dom";
import Footer from "../../footer/footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const AsmiraWrapper = styled.div`
  width: 1200px;
  background-color: #FFFFFF;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

const Namesa = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  font-weight: bold;
`;

const Asmira2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65px;
  border-bottom: 2px solid #E3E8FF;
`;

const Dataa = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 150px;
`;

const Ikonicaa = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const InputCoinsa = styled.input`
  height: 31px;
  width: 205px;
  border-radius: 10px;
  background-color: #374151;
  text-align: center;
  margin-top: 10px;
  color: white;
  border: none;
  outline: none;
  padding: 0 10px;
`;

const CoinButtonFavoritea = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 5px;
`;

const CoinsFunc = () => {
  const [coinNames, setCoinNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coinsPerPage = 10;

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
    <Container>
      <div>
        <InputCoinsa
          placeholder="Search cryptos"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <AsmiraWrapper>
        <Namesa>
          <Dataa>Rank</Dataa>
          <Dataa></Dataa>
          <Dataa>Names</Dataa>
          <Dataa>Price</Dataa>
          <Dataa>24hVolume</Dataa>
          <Dataa>MarketCap</Dataa>
          <Dataa></Dataa>
          <Dataa></Dataa>
          <Dataa></Dataa>
        </Namesa>

        {filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin).map((coin, index) => (
          <Asmira2 key={index}>
            <Dataa>{coin.rank}</Dataa>
            <Dataa>
              <Link to={`/coins/${coin.uuid}`}>
                <Ikonicaa src={coin.iconUrl} alt={coin.name} />
              </Link>
            </Dataa>
            <Dataa>{coin.name}</Dataa>
            <Dataa>{parseFloat(coin.price).toFixed(3)}$</Dataa>
            <Dataa>
              <p>{parseFloat(coin["24hVolume"].replace("$", "").replace(/,/g, "")).toLocaleString()}$</p>
            </Dataa>
            <Dataa>
              {parseFloat(coin.marketCap.replace("$", "").replace(/,/g, "")).toLocaleString()}$
            </Dataa>
            <Dataa>
              <Sparklines data={coin.sparkline.map((el) => parseFloat(el))}>
                <SparklinesLine className="sparkline" color="blue" />
              </Sparklines>

            </Dataa>
            <Dataa>
              <CoinButtonFavoritea
                onClick={() => handleFavoriteClick(coin)}
                style={{ color: isFavorite(coin) ? "#ff0000" : "#9ca3af" }}
              >
                <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
              </CoinButtonFavoritea>
            </Dataa>
            <Dataa>
              <CalcModal coinData={coin}/>
            </Dataa>
          </Asmira2>

        ))}

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredCoins.length / coinsPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </AsmiraWrapper>
    </Container>
  );
};

export default CoinsFunc;
