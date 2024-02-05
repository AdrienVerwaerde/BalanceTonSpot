import './App.css'
import Header from '../Header/Header'
import Homepage from '../Homepage/Homepage'
import Footer from '../Footer/Footer'
import Searchbar from '../SearchBar/Searchbar'

function App() {

  return (
    <div>
      <Header />
      <div>
      <Searchbar />
      <Homepage />
      <Footer />
      </div>
    </div>
  )
}

export default App
