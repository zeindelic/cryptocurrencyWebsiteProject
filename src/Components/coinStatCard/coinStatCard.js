import { HomeCoinsDiv } from "../../styledComponents/index.style"
import React from "react"
import { BsHeart } from 'react-icons/bs'
import CalculateIcon from '@mui/icons-material/Calculate';
import CalcModal from "../calcModal/calcmodal";
import { Sparklines, SparklinesLine } from "react-sparklines";

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
    

    return(
    
      <HomeCoinsDiv>
            <h4>{coinRank}</h4>
            <img  src={coinImage}/>
            <h3 className="coinName">{coinName}</h3>
            <h1>${Number(coinPrice).toLocaleString()}</h1>
            <h1>${Number(coin24hVolume).toLocaleString()}</h1>
            <h1>${Number(coinMarketCap).toLocaleString()}</h1>
            <Sparklines data={sparkline.map((el) => el)}>
            <SparklinesLine className='sparkline' color="blue" />
          </Sparklines>
          <button
              className="coin_button_favorite"
              onClick={() => handleFavoriteClick(coin)}
              style={{ color: isFavorite(coin) ? "#ff0000" : "#9ca3af" }}
            >
              <FontAwesomeIcon icon={faHeart} style={{ height: "20px" }} />
            </button>
            <CalcModal coinData={coinData}/>

      </HomeCoinsDiv>  
    )
}
export default CoinStatsCard