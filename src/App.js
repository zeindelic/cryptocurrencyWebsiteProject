import './App.css';
import { Route, Routes } from 'react-router';
import Footer from './Components/footer/footer';
import Header from './Components/header/header';
import CoinsFunc from './Components/pages/Coins/Coins';
import AboutUsFunc from './Components/pages/AboutUs/aboutUs';
import ExchangesFunc from './Components/pages/Exchanges/Exchanges';
import HomeFunc from './Components/pages/Home/Home';
import UserFunc from './Components/pages/User/User';
import CryptoDetailsPage from './Components/pages/CryptoDetails/cryptod';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomeFunc />} />
        <Route path='/coins' element={<CoinsFunc />} />
        <Route path='/about_us' element={<AboutUsFunc />} />
        <Route path='/exchanges' element={<ExchangesFunc />} />
        <Route path="/coins/:uuid/*" element={<CryptoDetailsPage />} />
        <Route path='/user' element={<UserFunc />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

