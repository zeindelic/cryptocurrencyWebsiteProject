import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./user.css";

const UserFunc = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coinranking.com/v2/coins?limit=20", {
          method: "GET",
          headers: {
            'X-RapidAPI-Key': '8681c9c505msh0b4878bef98ab83p1be1e3jsn5a9c80e6a018',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
          },
        });
        const data = await response.json();

        if (data && data.data && data.data.coins) {
          const formattedCryptocurrencies = data.data.coins.map((crypto) => ({
            ...crypto,
            price: parseFloat(crypto.price), 
            checked: false, 
          }));
          setCryptocurrencies(formattedCryptocurrencies);
          setLoading(false);
        } else {
          console.error("Error fetching data: Invalid response data format.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (uuid) => {
    setCryptocurrencies((prevCryptocurrencies) =>
      prevCryptocurrencies.map((crypto) =>
        crypto.uuid === uuid ? { ...crypto, checked: !crypto.checked } : crypto
      )
    );
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleCryptoButtonClick = () => {
    setMenuOpen(true);
  };

  const handleAddButtonClick = () => {
    const selectedCryptos = cryptocurrencies.filter((crypto) => crypto.checked);
    if (selectedCryptos.length === 0) {
      alert("Please select at least one cryptocurrency.");
      return;
    }
 
    
    const selectedCrypto = selectedCryptos[0];
    
    const inputElement = document.getElementById(selectedCrypto.uuid);
    if (inputElement && inputElement.value <= 0) {
      alert("Amount cannot be negative or 0.");
      return;
    }
    
    setSelectedCrypto(selectedCrypto);
    setMenuOpen(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 style={{ fontSize: "60px", lineHeight: "65px", margin: "0" }}>
          Buy Bitcoin <br /> & Crypto
        </h1>
        <h3 style={{ fontSize: "24px", margin: "0" }}>
          Sign up today and <span style={{ color: "rgb(239, 68, 68)" }}>buy 50+</span>
          <br /> cryptocurrencies in minutes
          <br /> Get started with as little as <span style={{ color: "rgb(239, 68, 68)" }}>$10</span>
        </h3>
        <Button variant="text" className="crypto-button" onClick={handleCryptoButtonClick}>
          {selectedCrypto ? selectedCrypto.name : "CRYPTO WALLET"}
        </Button>
      </div>
      <img
        src="https://i.postimg.cc/wjZfpsYF/Crypto-portfolio-rafiki.png"
        alt="btc"
        className="bitcoin-image"
      />
      <Dialog
        open={menuOpen}
        fullWidth
        maxWidth="lg"
        className="crypto-dialog"
        onBackdropClick={handleCloseMenu}
      >
        <DialogContent>
          {loading ? (
            <p>Loading...</p>
          ) : cryptocurrencies.length === 0 ? (
            <p>No cryptocurrencies found.</p>
          ) : (
            <div className="crypto-menu">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Check</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptocurrencies.map((crypto) => (
                    <React.Fragment key={crypto.uuid}>
                      <tr>
                        <td>{crypto.rank}</td>
                        <td>
                          <div>
                            <img src={crypto.iconUrl} alt={crypto.name} className="crypto-icon" />
                          </div>
                          <div>{crypto.name}</div>
                        </td>
                        <td>${crypto.price.toFixed(2)}</td>
                        <td>${crypto.marketCap}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={crypto.checked}
                            onChange={() => handleCheckboxChange(crypto.uuid)}
                          />
                        </td>
                        <td>
                          <input
                            id={crypto.uuid}
                            type="number"
                            defaultValue={0}
                            disabled={!crypto.checked}
                          
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="6"><hr /></td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddButtonClick} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserFunc;