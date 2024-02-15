import './App.css'
import React, { useState } from 'react'
import Header from '../HeaderComponents/Header/Header'
import Footer from '../Footer/Footer'
import Searchbar from '../SearchBar/Searchbar'
import { Outlet } from 'react-router-dom'
import SearchContext from '../../contextAPI/searchContext.ts'
import ThemeContext from '../../contextAPI/themeContext.ts'

export default function App() {
  const [spots, setSpots] = useState([]);
  const [theme, setTheme] = useState([]);

return (
    <div className="app-container">
    <SearchContext.Provider value={{ spots, setSpots }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <main>
      <Searchbar />
      <Outlet />
      </main>
      <Footer />
      </ThemeContext.Provider>
    </SearchContext.Provider>
    </div>
  )
}