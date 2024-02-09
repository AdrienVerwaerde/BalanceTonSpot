import './App.css'
import React, { useEffect, useState } from 'react'
import Header from '../HeaderComponents/Header/Header'
import Footer from '../Footer/Footer'
import Searchbar from '../SearchBar/Searchbar'
import { Outlet } from 'react-router-dom'
import SearchContext from '../../contextAPI/searchContext.ts'
import axios from 'axios'

export default function App() {
  const [spots, setSpots] = useState([]);

  // Function to fetch the spots from the API
  async function fetchSpots() {
    try {
        const response = await axios.get('http://ombelinepinoche-server.eddi.cloud:8443/api/spots');
        setSpots(response.data); // Update the spotslist state variable with the fetched data
    } catch (error) {
        console.error(error);
    }
}

// Fetch the spots from the database
useEffect(() => {
    fetchSpots();
}, []);

  return (
    <SearchContext.Provider value={{ spots, setSpots }}>
      <Header />
      <main>
      <Searchbar />
      <Outlet />
      </main>
      <Footer />
    </SearchContext.Provider>
  )
}