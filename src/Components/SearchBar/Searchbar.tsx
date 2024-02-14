import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Searchbar.css";
import SearchButtons from "./SearchButtons/SearchButtons";

import SearchContext from '../../contextAPI/searchContext';

const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

export default function Searchbar() {
  const { setSpots } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('search') || '';
    setSearchTerm(name);

    if (name) {
      searchSpots(name);
    }
    else {
      setError('');
      fetchAllSpots();
    }
  }, [location.search]);

  useEffect(() => {
    return () => setError('');
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading) {
      setSearchTerm('');
    }
  }, [isLoading]);

  const fetchLocationSpots = async (name: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location/${name}/spots`, {
        params: { name }
      });
      return { success: true, data: response.data };
    } 
    catch (error) {
      return { success: false, error: error };
    }
  };

  const fetchSingleSpot = async (name: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/spot/${name}`);
      return { success: true, data: response.data };
    } 
    catch (error) {
      return { success: false, error: error };
    }
  };

  // Nouvelle fonction pour récupérer tous les spots
  const fetchAllSpots = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE_URL}/spots`); // Ajustez selon votre endpoint
      setSpots(response.data);
    } catch (error) {
      console.error('Error fetching all spots:', error);
      setError('Erreur lors de la récupération des spots.');
    } finally {
      setIsLoading(false);
    }
  };

  const searchSpots = async (name: string) => {
    if (!name.trim()) {
      fetchAllSpots(); // Appelle fetchAllSpots si la recherche est vide
      return;
    }

    setIsLoading(true);
    setError('');
    setSpots([]);

    const [locationSpotsResult, singleSpotResult] = await Promise.all([
      fetchLocationSpots(name),
      fetchSingleSpot(name)
    ]);

    let spots = [];

    if (locationSpotsResult.success) {
      spots = locationSpotsResult.data;
    } else {
      console.error('Error fetching location spots:', locationSpotsResult.error);
    }

    if (singleSpotResult.success && singleSpotResult.data) {
      spots = [singleSpotResult.data, ...spots];
    } else {
      console.error('Error fetching single spot:', singleSpotResult.error);
    }

    if (spots.length > 0) {
      setSpots(spots);
    } else {
      setError('Aucun spot trouvé.');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <img src="https://i.postimg.cc/wjKvWdkq/bouton-skate-color.png"
          alt="loader"
          className="loader-img" />
        <p id="loader-message">Recherche des spots...</p>
      </div>
    );
  }

  const cleanSearchTerm = (term: string) => term.replace(/\s+/g, '-').toLowerCase();

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
    <>
      <div id="searchbar-container">
      <SearchButtons />
        <Input
          icon={<Icon name="search" link onClick={handleSearchClick} />}
          placeholder="Rechercher un spot ou une ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <div className="search-error">{error}</div>}
    </>
  );
}
