// Import necessary hooks, libraries, and components
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favoris.css';
import SpotCard from '../../SpotsList/SpotCard/SpotCard';

// Define the structure for a spot object
interface Spot {
    id: number;
    name: string;
    picture: string;
    rating?: number;
    description: string;
    address: string;
}

// Favoris component, does not take props
export default function Favoris() {
    // State to store the list of favorite spots
    const [spots, setSpots] = useState<Spot[]>([]);

    // Fetch favorite spots on component mount
    useEffect(() => {
        fetchFavoriteSpots();
    }, []);

    const fetchFavoriteSpots = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
          try {
              const response = await axios.get('http://ombelinepinoche-server.eddi.cloud:8443/api/favorites', {
                  headers: { Authorization: `Bearer ${token}` },
              });
              setSpots(response.data);
          } catch (error) {
              if (error.response && error.response.status === 404) {
                  // Si une erreur 404 est reçue, considérer qu'il n'y a plus de favoris
                  setSpots([]);
              } else {
                  console.error('Error fetching favorite spots:', error);
              }
          }
      }
  };

    // Render message if there are no favorite spots
    if (!spots || spots.length === 0) {
        return <div className="fav-none-title"><h2>Aucun spot en favoris.</h2></div>;
    }

    // Render favorite spots using the SpotCard component
    return (
        <main>
            <div className="favs-container">
                <h1 id="fav-title">SPOTS FAVORIS</h1>
                {spots.map((spot) => (
                    <SpotCard key={spot.id} spot={spot} onFavoriteToggle={fetchFavoriteSpots} />
                ))}
            </div>
        </main>
    );
};




