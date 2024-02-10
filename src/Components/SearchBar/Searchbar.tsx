import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

import SearchContext from '../../contextAPI/searchContext';

// Utiliser les variables d'environnement pour l'URL de base de l'API
const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

const options = [
  { key: "all", text: "Qu'importe !", value: "all" },
  { key: "skateboard", text: "Skateboard", value: "skateboard" },
  { key: "snowboard", text: "Snowboard", value: "snowboard" },
];

export default function Searchbar() {
  const { setSpots } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
      searchSpots(searchTerm); // Appel initial avec le searchTerm vide
  }, []); // Dépendances vides pour exécuter une seule fois au montage

  const searchSpots = async (name) => {
      setIsLoading(true);
      setError('');

      try {
          const response = await axios.get(`${API_BASE_URL}/location/${name}/spots`, {
              params: { name } // Utiliser searchTerm comme paramètre de requête
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
      }
  };
  
  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          searchSpots(searchTerm);
          navigate("/spotslist");
      }
  };

  return (
    <div id="searchbar-container">
      <Input
        action={<Dropdown button basic floating options={options} defaultValue="all" />}
        icon="search"
        iconPosition="left"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        loading={isLoading}
      />
      {error && <p className="error-message">{error}</p>} {/* Affichage des messages d'erreur */}
    </div>
  );
}
