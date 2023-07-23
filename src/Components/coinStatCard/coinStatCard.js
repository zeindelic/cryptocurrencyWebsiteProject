import { HomeCoinsDiv } from "../../styledComponents/index.style"
import React from "react"
import { Sparklines, SparklinesLine } from "react-sparklines";

const CoinStatsCard = ({
coinRank,
coinImage,
coinName,
coinPrice,
coin24hVolume,
coinMarketCap,
sparkline,

}) => {

   const newCoinPrice = coinPrice.toLocaleString()
    return(
      <HomeCoinsDiv>
            <h1>{coinRank}</h1>
            <img src={coinImage}/>
            <h1 className="coinName">{coinName}</h1>
            <h1>${Number(coinPrice).toLocaleString()}</h1>
            <h1>${Number(coin24hVolume).toLocaleString()}</h1>
            <h1>${Number(coinMarketCap).toLocaleString()}</h1>
            <Sparklines data={sparkline.map((el) => el)}>
            <SparklinesLine color="blue" />
          </Sparklines>
      </HomeCoinsDiv>  
    )
}
export default CoinStatsCard