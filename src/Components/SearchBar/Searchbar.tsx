  // This component is responsible for rendering the search bar and handling search functionality.
  // It uses React hooks and context API for state management.
  // It also makes API calls to fetch spots based on the search term.

  import { useContext, useEffect, useState } from "react";
  import axios from "axios";
  import { Input, Icon } from "semantic-ui-react";
  import { useNavigate, useLocation } from "react-router-dom";
  import "./Searchbar.css";

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
      // Fetch the search term from the URL query parameter
      const searchParams = new URLSearchParams(location.search);
      const name = searchParams.get('search') || '';
      setSearchTerm(name);

      if (name) {
        // If a search term is present, perform the search
        searchSpots(name);
      }
      else {
        // Reset error when searchTerm is empty
        setError('');
      }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    // Reset error when navigating away from the current page
    useEffect(() => {
      return () => setError('');
    }, [location.pathname]);

      // Reset the search term when the loading state changes
    useEffect(() => {
      if (!isLoading) {
        setSearchTerm('');
      }
    }, [isLoading]);

    // Make an API call to fetch spots by location
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

    // Make an API call to fetch a single spot by its name
    const fetchSingleSpot = async (name: string) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/spot/${name}`);
        return { success: true, data: response.data };
      } 
      catch (error) {
        return { success: false, error: error };
      }
    };

    //Data treatment after axios request:

    const searchSpots = async (name: string) => {
      if (!name.trim()) {
        // If the search term is empty, set loading state to false and return
        setIsLoading(false);
        return;
      }

      //Default value of the useState when new research is set
      setIsLoading(true);
      setError('');
      setSpots([]);

      // Fetch spots by location and a single spot in parallel
      const [locationSpotsResult, singleSpotResult] = await Promise.all([
        fetchLocationSpots(name),
        fetchSingleSpot(name)
      ]);
      //Spots are a list so we put them in an array
      let spots = [];

      //If we find spots with this location in the API, shows its/their data
      if (locationSpotsResult.success) {
        spots = locationSpotsResult.data;
      } 
      else {
        console.error('Error fetching location spots:', locationSpotsResult.error);
      }

      //If we find spot(s) with this name in the API, shows its/their data
      if (singleSpotResult.success && singleSpotResult.data) {
        spots = [singleSpotResult.data, ...spots];
      } 
      else {
        console.error('Error fetching single spot:', singleSpotResult.error);
      }

      //If 1 or more spot(s) is found in the DB, show it/them
      if (spots.length > 0) {
        setSpots(spots);
      }
      //If not, show an error message
      else {
        setError('Aucun spot trouvé.');
      }
      setIsLoading(false);
    };

    // Render a loader while spots are being fetched
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

    //When using SPACE in the searchbar, turns it into "-" to match DB
    const cleanSearchTerm = (term: string) => term.replace(/\s+/g, '-').toLowerCase();

    // Handle search when Enter key is pressed
    const handleKeyDown = (e: { key: string; }) => {
      if (e.key === 'Enter') {
        const cleanedSearchTerm = cleanSearchTerm(searchTerm);
        navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
      }
    };

    // Handle search when search icon is clicked
    const handleSearchClick = () => {
      const cleanedSearchTerm = cleanSearchTerm(searchTerm);
      navigate(`/spotslist?search=${encodeURIComponent(cleanedSearchTerm)}`);
    };

    return (
      <>
        <div id="searchbar-container">
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
