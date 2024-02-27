// Import necessary dependencies
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Searchbar.css";
import SearchButtons from "./SearchButtons/SearchButtons";
import SearchContext from '../../contextAPI/searchContext';

// Define the base URL for API requests
const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

// Define the Searchbar component
export default function Searchbar() {
  // Retrieve the setSpots function from the SearchContext
  const { setSpots } = useContext(SearchContext) || {};

  // Define state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the navigate and location functions from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch spots based on the search query when the location.search changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('search') || '';
    setSearchTerm(name);

    if (name) {
      searchSpots(name);
    } else {
      setError('');
      fetchAllSpots();
    }
  }, [location.search]);

  // Clear the error when the location.pathname changes
  useEffect(() => {
    return () => setError('');
  }, [location.pathname]);

  // Clear the search term when isLoading changes
  useEffect(() => {
    if (!isLoading) {
      setSearchTerm('');
    }
  }, [isLoading]);

  // Fetch spots based on location name
  const fetchLocationSpots = async (name: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location/${name}/spots`, {
        params: { name }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  // Fetch a single spot based on spot name
  const fetchSingleSpot = async (name: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/spot/${name}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  // Fetch all spots
  const fetchAllSpots = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE_URL}/spots`);
      if (setSpots) {
        setSpots(response.data);
      }
    } catch (error) {
      console.error('Error fetching all spots:', error);
      setError('Erreur lors de la récupération des spots.');
    } finally {
      setIsLoading(false);
    }
  };

  // Search for spots based on the search query
  const searchSpots = async (name: string) => {
    if (!name.trim()) {
      fetchAllSpots(); // Calls fetchAllSpots if search is empty
      return;
    }

    setIsLoading(true);
    setError('');
    if (setSpots) {
      setSpots([]);
    }

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
      if (setSpots) {
        setSpots(spots);
      }
    } else {
      setError('Aucun spot trouvé.');
    }
    setIsLoading(false);
  };

  // Render the Searchbar component
  if (isLoading) {
    return (
      <div className="loader-container">
        <img src="/bouton-skate-color-2.png"
          alt="loader"
          className="loader-img" />
        <p id="loader-message">Chargement en cours...</p>
      </div>
    );
  }

  // Clean the search term by replacing spaces with dashes and converting to lowercase
  const cleanSearchTerm = (term: string) => term.replace(/\s+/g, '-').toLowerCase();

  // Handle key down event for search input
  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      const cleanedSearchTerm = cleanSearchTerm(searchTerm);
      navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    const cleanedSearchTerm = cleanSearchTerm(searchTerm);
    navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
  };

  // Return the JSX for the Searchbar component
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