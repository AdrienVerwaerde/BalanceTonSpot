import './App.css'
import Header from '../Header/Header'
import Homepage from '../Homepage/Homepage'
import Footer from '../Footer/Footer'
import Searchbar from '../SearchBar/Searchbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <Searchbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
