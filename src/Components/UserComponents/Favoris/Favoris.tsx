import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favoris.css';

interface Spot {
  name: string;
  image: string;
  description: string;
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
    return <div className="favorite-spots"><h2>Aucun spot en favoris.</h2></div>;
  }

  return (
    <main>
      <div className="favorite-spots">
        <h2>BALANCE MES FAVORIS</h2>
        <ul>
          {(spots as Spot[]).map((spot, index) => (
            <li key={index} className="spot-item">
              <img src={spot.image} alt={spot.name} className="spot-image" />
              <div className="spot-info">
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}


