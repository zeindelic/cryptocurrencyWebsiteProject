import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import EventNoteIcon from "@mui/icons-material/EventNote";
import './cryptod.css';

const CryptoDetailsPage = () => {
  const { uuid } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
      headers: {
        'X-RapidAPI-Key': '3b19298a97mshc8c02c752874df7p11a258jsnd1e9799fa782',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };

    axios
    .request(options)
    .then((response) => {
      setCoin(response.data.data.coin);
      setLoading(false);
    })
    .catch((error) => {
    
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}, [uuid]);

  return (
    <div className="ml-11 mt-5 mr-20">
      {loading ? (
        <>
          <ClipLoader color={'#ef6e6e'} size={45} />
          <h1 className="text-lg text-red-900">Loading cryptocurrency details...</h1>
        </>
      ) : (
        coin && (
          <>
            <div className="top-section">
              <span className="rank">{coin.rank}</span>
              <img src={coin.iconUrl} alt={coin.name} className="pict" />
              <span className="name">{coin.name}</span>
              <span className="abbr">{coin.symbol}</span>
              <span className="price">${parseFloat(coin.price).toFixed(2)}</span>
              <div className="links">
                <Link to="/" className="home-link">
                  Home
                </Link>
                <Link to="/exchanges" className="exchange-link">
                  Exchanges
                </Link>
              </div>
            </div>
            <div className="line"></div>
            <div className="info">
              <h2 className="pricech">Price chart</h2>
              <p className="hours">
                24h: <span className="color">{coin.change} %</span>
              </p>
              <span className="font-bold">
                High <span className="high">${Number(coin?.supply?.circulating).toLocaleString()}</span>
              </span>
            </div>
            <div className="line"></div>
            <div className="mt-10 mb-12 max-w-screen price-chart-container">
              <Sparklines data={coin?.sparkline.map((el) => el)}>
                <SparklinesLine color="blue" />
              </Sparklines>
            </div>
            <div className="value-supply-container">
  <div className="value-statistics-info">
    <h1 style={{ textAlign: "center", fontWeight: "normal" }}>Value statistic</h1>
    <p style={{ marginLeft: "60px" }}>
      An overview showing the statistics of {coin.name}, such as the base and quote currency, the rank, and trading volume.
    </p>

    <div className="info-row">
    <PaidOutlinedIcon  color="primary" fontSize='large' style={{marginLeft: "120px"}}/>
      <div className="info-label">Price to EUR</div>
      <div className="info-value">{coin.price}</div>
    </div>
    <div className="line2"></div>

    <div className="info-row">
    <CurrencyBitcoinOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">Price to BTC</div>
      <div className="info-value">$ {coin?.priceAt} {coin?.symbol}</div>
    </div>
    <div className="line2"></div>

    <div className="info-row">
    <BarChartOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">Rank</div>
      <div className="info-value">#{coin.rank}</div>
    </div>
    <div className="line2"></div>

    <div className="info-row">
    <EggOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">24h Volume</div>
      <div className="info-value"> {" "}
              ${Number(coin?.price).toLocaleString()}</div>
    </div>
    <div className="line2"></div>

    <div className="info-row">
    <WaterOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">Market Cap</div>
      <div className="info-value">${coin?.supply.supplyAt}</div>
    </div>
    <div className="line2"></div>

    <div className="info-row">
    <WaterOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">Fully Diluted market cap</div>
      <div className="info-value">${coin?.supply.circulating}</div>
    </div>
    <div className="line2"></div>
    <div className="info-row">
    <BeenhereOutlinedIcon fontSize="large" color="primary" style={{marginLeft: "120px"}}/>
      <div className="info-label">All-time high (daily avg.)</div>
      <div className="info-value"> ${Number(coin?.supply.total).toLocaleString()}</div>
    </div>
    <div className="line2"></div>
  </div>

  {coin.supply && (
                <div className="supply-information">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <h1 style={{ marginLeft: "10px", fontWeight: "normal", textAlign: "center" }}>Supply information</h1>
                      <p style={{ marginLeft: "80px" }}>View the total and circulating supply of {coin.name}, including details on how the supplies are calculated.</p>
                    </div>
                  </div>
                  <div className='card'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircleOutlineRoundedIcon color='green' style={{ marginTop: "10px", color: "rgb(34, 197, 94)"}} />

    <p className='title'>Verified supplys</p>
  </div>
                    <p className='supply-text'>Updated 2 minutes ago</p>
                    <div className='line3'></div>
                    <p className='supply-text'>Total supply <span className='a'>  {" "}$ {coin?.supply.circulating}</span> </p>
                    <div className='line3'></div>
                    <p className='supply-text'>Max supply <span className="a">$ {coin?.supply.max}</span>{" "}</p>
                    <div className='line3'></div>
                    <p className='supply-text'>Total Supply <span className='a'> $ {coin?.supply.total}</span>{" "}</p>
                  </div>
                </div>


              )}


             
            </div>
         

            <div className="links-whatis-container">
            <div className="what-is">
              <p style={{fontWeight: "bold", marginLeft: "350px", marginBottom: "0px", marginTop: "35px"}}>What is {coin?.name}</p>
              <div className='border'>
                <p className='descr'>{coin.description}</p>
              </div>
            </div>

           
            <div className="links-info">
            <h4 style={{textAlign: "left", marginLeft: "45px", marginTop: "50px", marginBottom: "0px"}}>Links</h4>
              <div className="info-row">
              <LinkIcon fontSize="large" color="primary" style={{ marginLeft: "50px", marginTop: "0px" }} />
                <div className="info-label">website</div>
                <div className="info-value2">  <a href={`https://${coin.name}.com`}>{coin.name}.org</a></div>
              </div>
              <div className="line5"></div>

              <div className="info-row">
              <LinkIcon fontSize="large" color="primary" style={{ marginLeft: "50px", marginTop: "0px" }} />
                <div className="info-label">facebook</div>
                <div className="info-value2"><a href={`https://facebook.com/${coin.name}`}>{coin.name}</a></div>
              </div>
              <div className="line5"></div>

              <div className="info-row">
              <CurrencyBitcoinOutlinedIcon
                    fontSize="large"
                    color="primary"
                    style={{ marginLeft: "50px", marginTop: "0px" }}
                  />
               
                <div className="info-label">bitcointalk</div>
                <div className="info-value2"> <a href={`https://bitcointalk.org`}>bitcointalk.org</a></div>
              </div>
              <div className="line5"></div>

              <div className="info-row">
              <CurrencyExchangeIcon fontSize="large" color="primary"  style={{ marginLeft: "50px", marginTop: "0px"}}/>
                <div className="info-label">explorer</div>
                <div className="info-value2"><a href={`https://blockchain.com`}>blockchain.com</a></div>
              </div>
              <div className="line5"></div>

              <div className="info-row">
                <GitHubIcon color="primary" fontSize="large" style={{ marginLeft: "50px", marginTop: "0px" }} />
                <div className="info-label">github</div>
                <div className="info-value2"> <a href={`https://github.com/${coin.name}`}>{coin.name}</a></div>
              </div>
              <div className="line5"></div>


              <div className="info-row">
              <RedditIcon fontSize="large" color="primary"  style={{ marginLeft: "50px", marginTop: "0px" }}/>
                <div className="info-label">reddit</div>
                <div className="info-value2"><a href={`https://reddit.com/${coin.name}`}>{coin.name}</a></div>
              </div>
              <div className="line5"></div>

              <div className="info-row">
              <TelegramIcon fontSize="large" color="primary" style={{ marginLeft: "50px", marginTop: "0px" }}/>
                <div className="info-label">telegram</div>
                <div className="info-value2"><a href={`https://t.me/${coin.name}_Magazine`}>{coin.name}</a></div>
              </div>
              <div className="line5"></div>
          
              <div className="info-row">
              <EventNoteIcon fontSize="large" color="primary" style={{ marginLeft: "50px", marginTop: "0px" }}/>
                <div className="info-label">whitepaper</div>
                <div className="info-value2"> <a href={`https://bitcointalk.org`}>{coin.name} whitepapers</a></div>
              </div>
              <div className="line5"></div>

            </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CryptoDetailsPage;