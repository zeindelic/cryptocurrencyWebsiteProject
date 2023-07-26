import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { FavoritesProvider } from './Components/pages/FavoritesContext'; // Dodajte ovaj import
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <FavoritesProvider> {/* Dodajte ovaj wrapper */}
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
