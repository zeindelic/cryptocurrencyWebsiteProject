import { Link } from "react-router-dom";
import { HomeCoinsDiv } from "../../styledComponents/index.style";
import React from "react";
import { BsHeart } from 'react-icons/bs';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalcModal from "../calcModal/calcmodal";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";

const CoinStatsCard = ({
  coinRank,
  coinImage,
  coinName,
  coinPrice,
  coin24hVolume,
  coinMarketCap,
  sparkline,
  coinData,
}) => {
  return (
    <HomeCoinsDiv>
      <h4>{coinRank}</h4>
      <Link to={`/coins/${coinData.uuid}`}> 
        <img src={coinImage} alt={coinName} />
      </Link>
      <h3 className="coinName">{coinName}</h3>
      <h1>${Number(coinPrice).toLocaleString()}</h1>
      <h1>${Number(coin24hVolume).toLocaleString()}</h1>
      <h1>${Number(coinMarketCap).toLocaleString()}</h1>
      <Sparklines data={sparkline.map((el) => el)}>
        <SparklinesLine className='sparkline' color="blue" />
      </Sparklines>
      <button
              className="coin_button_favorite"
            >
              <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
            </button>
      
      <CalcModal coinData={coinData} />
    </HomeCoinsDiv>
  )
};


export default CoinStatsCard;