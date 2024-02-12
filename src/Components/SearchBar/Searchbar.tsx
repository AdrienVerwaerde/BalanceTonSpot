import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

import SearchContext from '../../contextAPI/searchContext';

// Utiliser les variables d'environnement pour l'URL de base de l'API
const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

/**
 * Component for displaying a search bar.
 */
export default function Searchbar() {
  const { setSpots } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    searchSpots(searchTerm); // Initial call with empty searchTerm
  }, []); // Empty dependencies to run only once on mount

  //Checks if isLoading=true and if not, clears the search input
  useEffect(() => {
    if (!isLoading) {
      setSearchTerm('');
    }
  }, [isLoading]);

  /**
   * Function to search for spots.
   * @param {string} name - The name to search for.
   */
  const searchSpots = async (name) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/location/${name}/spots`, {
        params: { name } // Use searchTerm as query parameter
      });
      const data = response.data;

      if (data && Array.isArray(data)) {
        setSpots(data);
      } else {
        setSpots([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('');
    } finally {
      setIsLoading(false);
      setSearchTerm('');
    }
  };
  
  /**
   * HANDLE KEY DOWN EVENT.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchSpots(searchTerm);
      navigate("/spotslist");
    }
  };

  // HANDLE CLICK ON SEARCH ICON
  const handleSearchClick = () => {
    searchSpots(searchTerm);
    navigate("/spotslist");
  };

  return (
  <div id="searchbar-container">
    <Input
        icon={<Icon name="search" link onClick={handleSearchClick} />}
        placeholder="Rechercher un spot ou une ville..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    {error && <p className="error-message">{error}</p>} {/* Display error messages */}
  </div>
  );
}


