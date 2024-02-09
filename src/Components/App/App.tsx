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