import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favoris.css';
import SpotCard from '../../SpotsList/SpotCard/SpotCard';

interface Spot {
  id: number;
  name: string;
  picture: string;
  description: string;
  address: string;
  rating: number;
}

export default function Favoris() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetchFavoriteSpots();
  }, []);

  const fetchFavoriteSpots = async () => {
    const token = localStorage.getItem('userToken');
    if (token && token.trim() !== '') {
      try {
        const response = await axios.get('http://ombelinepinoche-server.eddi.cloud:8443/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpots(response.data);
      } catch (error) {
        console.error('Error fetching favorite spots', error);
      }
    } else {
      console.log('No token found or token is invalid');
    }
  };

  if (!spots || spots.length === 0) {
    return <div className="fav-none-title"><h2>Aucun spot en favoris.</h2></div>;
  }

  return (
    <main>
      <div className="favs-container">
        <h1 id="fav-title">BALANCE MES FAVORIS</h1>
          {/* CARD SPOT */}
          {(spots as Spot[]).map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
      </div>
    </main>
  );
}


