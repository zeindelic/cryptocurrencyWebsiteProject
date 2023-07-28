import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './asmir.css'
import { MainHomeDiv, HomeCoinsDiv,Nameloc } from "../../../styledComponents/index.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useFavorites } from '../FavoritesContext';
import { Link } from "react-router-dom";
import { BsHeart } from 'react-icons/bs'


import ClipLoader from "react-spinners/ClipLoader";
import CalcModal from "../../calcModal/calcmodal";
const HomeFunc = () => {
    const [coinStats, setCoinStats] = useState([])
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('')
    const [coinNames, setCoinNames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h',
          'tiers[0]': '1',
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '50',
          offset: '0'
        },
        headers: {
          'X-RapidAPI-Key': '3b19298a97mshc8c02c752874df7p11a258jsnd1e9799fa782',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };
      const getDataCoinStats = () => {
        setLoading(true);
        axios.request(options).then(function (response) {
          setCoinStats(response.data.data);
          setLoading(false);
        });
      }



      useEffect(() => {
        getDataCoinStats();
      }, []);
      console.log(coinStats);
      console.log(value);

      const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();


      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
      };

      const handleFavoriteClick = (coin) => {
        if (isFavorite(coin)) {
          removeFavorite(coin);
        } else {
          addFavorite(coin);
        }
      };
    return(
        <MainHomeDiv>
            {loading ? (
      <>
        <ClipLoader color={"#ef6e6e"} size={45} />
        <h1 className="text-lg text-red-900">
          Loading data from covid-19 api.
        </h1>
      </>
    ) : (
       
        <> 
        <input 
        type="text"
        value={value} 
        placeholder="search coins"
        style={{border:'solid lightgray 2px',borderRadius:'7px'}}
        onChange={e => setValue(e.target.value)} 
      />
        <HomeCoinsDiv>
        <h2>Rank</h2>
        <h1></h1>
        <h1></h1>
        <Nameloc>name</Nameloc>
        <h2>price</h2>
        <h2>24hVolume</h2>
        <h2>MarketCap</h2>
        <h2></h2>
        <h2></h2>
        <h2></h2>
    </HomeCoinsDiv>
    

        {coinStats.coins.filter(coin => {
            if (!value) return true
            if (coin.name.includes(value)   || coin.symbol.includes(value)) {
                return true
            }
            
            
        })
        .slice(0, 10).map((coin, index) => (
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
          <div className="data">
          <button
            className="coin_button_favorite"
            onClick={() => handleFavoriteClick(coin)}
            style={{ color: isFavorite(coin) ? "#ff0000" : "#9ca3af" }}
          >
            <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
          </button>
          <CalcModal coinData={coin}/>
          </div>
        </div>
       ))
    
    
    
    }
     </>
    )}
        </MainHomeDiv>
    )
}
export default HomeFunc