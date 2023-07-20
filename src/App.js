import './App.css';
import { Route, Routes } from 'react-router';
import Header from './Components/header/header';
import CoinsFunc from './Components/pages/Coins/Coins';
import AboutUsFunc from './Components/pages/AboutUs/aboutUs';
import ExchangesFunc from './Components/pages/Exchanges/Exchanges';
import HomeFunc from './Components/pages/Home/Home';
import UserFunc from './Components/pages/User/User';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
      <Route path='/' element={<HomeFunc/>} />
      <Route path='/coins' element={<CoinsFunc/>} />
      <Route path='/about_us' element={<AboutUsFunc/>} />
      <Route path='/exchanges' element={<ExchangesFunc/>} />
      <Route path='/user' element={<UserFunc/>} />
      </Routes>
    </div>
  );
}

export default App;
