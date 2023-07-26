import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CoinStatsCard from "../../coinStatCard/coinStatCard";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { MainHomeDiv, HomeCoinsDiv } from "../../../styledComponents/index.style";
import { BsHeart } from 'react-icons/bs'

import ClipLoader from "react-spinners/ClipLoader";
const HomeFunc = () => {
    const [coinStats, setCoinStats] = useState([])
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('')

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
        onChange={e => setValue(e.target.value)} 
      />
        <HomeCoinsDiv>
        <h2>Rank</h2>
        <h2></h2>
        <h2>name</h2>
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
        .slice(0, 10).map((el) => (
            <CoinStatsCard 
            coinRank={el.rank}
            coinImage={el.iconUrl}
            coinName={el.name}
            coinPrice={el.price}
            coin24hVolume={el['24hVolume']}
            coinMarketCap={el.marketCap}
            sparkline={el.sparkline.map((el) => el)}
            coinData={el}
            />
       ))
    
    
    
    }
     </>
    )}
        </MainHomeDiv>
    )
}
export default HomeFunc