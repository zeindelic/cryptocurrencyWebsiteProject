// App.js
import './App.css';
import { Route, Routes } from 'react-router';
import Header from './Components/header/header';
import CoinsFunc from './Components/pages/Coins/Coins';
import AboutUsFunc from './Components/pages/AboutUs/aboutUs';
import ExchangesFunc from './Components/pages/Exchanges/Exchanges';
import HomeFunc from './Components/pages/Home/Home';
import UserFunc from './Components/pages/User/User';
import FavoriteFunc from './Components/pages/favorite/Favorite';


// Importujemo FavoritesProvider
import { FavoritesProvider } from './Components/pages/FavoritesContext';


function App() {
  return (
    // Obavijamo aplikaciju sa FavoritesProvider
    <FavoritesProvider>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomeFunc />} />
          <Route path='/coins' element={<CoinsFunc />} />
          <Route path='/about_us' element={<AboutUsFunc />} />
          <Route path='/exchanges' element={<ExchangesFunc />} />
          <Route path='/favorite' element={<FavoriteFunc />} />
          <Route path='/user' element={<UserFunc />} />
        </Routes>
      </div>
    </FavoritesProvider>
  );
}

export default App;
