import './App.css'
import Header from '../HeaderComponents/Header/Header'
import Footer from '../Footer/Footer'
import Searchbar from '../SearchBar/Searchbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <main>
      <Searchbar />
      <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
