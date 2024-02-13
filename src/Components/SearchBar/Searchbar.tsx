import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Searchbar.css";

import SearchContext from '../../contextAPI/searchContext';

const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

/**
 * Component for the search bar.
 * This component allows users to search for spots or cities.
 * It retrieves the search term from the URL query parameter and performs a search using the term.
 * The search results are displayed in a list of spots.
 */
export default function Searchbar() {
  const { setSpots } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    // Reading research terms from URL
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('search') || '';
    setSearchTerm(name);
    if (name) {
      searchSpots(name);
    }
  }, [location.search]);

  useEffect(() => {
    if (!isLoading) {
      setSearchTerm('');
    }
  }, [isLoading]);

  const searchSpots = async (name) => {
    if (!name.trim()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    setSpots([]); // Clears the spots before making a new search

    try {
      // Exécution des requêtes en parallèle
      const [locationSpotsResponse, singleSpotResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/location/1/spots`, {
          params: { name }
        }),
        axios.get(`${API_BASE_URL}/spot/${name}`)
      ]);

      // Traitement de la première requête (spots par location)
      const locationSpotsData = locationSpotsResponse.data;
      let spots = [];
      console.log(name)
      if (locationSpotsData && Array.isArray(locationSpotsData) && locationSpotsData.length > 0) {
        spots = locationSpotsData;
      }

      // Traitement de la seconde requête (spot unique)
      const singleSpotData = singleSpotResponse.data;
      if (singleSpotData) {
        // Ici, vous pouvez décider comment intégrer singleSpotData avec spots
        // Par exemple, ajouter au début ou à la fin de la liste, si unique
        spots = [singleSpotData, ...spots]; // Ajoute le spot unique au début de la liste
      }

      if (spots.length > 0) {
        setSpots(spots);
      } else {
        setError('Aucun résultat trouvé. Essayez une autre recherche.');
        setSpots([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Une erreur est survenue lors de la recherche.');
    } finally {
      setIsLoading(false);
    }
  };

  const cleanSearchTerm = (term) => {
    return term.replace(/\s+/g, '-').toLowerCase();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cleanedSearchTerm = cleanSearchTerm(searchTerm);
      navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
    }
  };
  
  const handleSearchClick = () => {
    const cleanedSearchTerm = cleanSearchTerm(searchTerm);
    navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
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
    </div>
  );
}