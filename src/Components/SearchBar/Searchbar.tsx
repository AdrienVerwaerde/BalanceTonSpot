import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom"; // Ajout de useLocation
import "./Searchbar.css";

import SearchContext from '../../contextAPI/searchContext';

const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

export default function Searchbar() {
  const { setSpots } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Pour accéder à la query de l'URL

  useEffect(() => {
    // Lecture du terme de recherche depuis l'URL
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('search') || '';
    setSearchTerm(name);
    if (name) {
      searchSpots(name);
    }
  }, [location.search]); // Dépendance à location.search pour réagir aux changements

  useEffect(() => {
    if (!isLoading) {
      setSearchTerm('');
    }
  }, [isLoading]);

  const searchSpots = async (name: string) => {
    if (!name.trim()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/location/${name}/spots`, {
        params: { name }
      });
      const data = response.data;

      if (data && Array.isArray(data)) {
        setSpots(data);
      } else {
        setSpots([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Une erreur est survenue lors de la recherche.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      navigate(`/spotslist?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchClick = () => {
    navigate(`/spotslist?search=${encodeURIComponent(searchTerm)}`);
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

