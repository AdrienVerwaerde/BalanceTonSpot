import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Spot.css';

// Interface TS for spot
interface Spot {
  name: string;
  description: string;
  picture: string;
  address: string;
  rating: number;
}

/**
 * Component that displays details of a spot.
 */
export default function Spot() {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract the 'name' parameter from the URL
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    /**
     * Fetches the details of the spot from the server.
     */
    const fetchSpotDetails = async () => {
      if (name) {
        try {
          const formattedSpotName = name.toLowerCase().replace(/\s/g, "-");
          const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}`);
          setSpot(response.data);
          setLoading(false);
        } catch (err) {
          setError('404');
          setLoading(false);
        }
      }
    };

    fetchSpotDetails();
  }, [name]); // Add 'name' as a dependency for useEffect

  if (loading) {
    return (
      <div className="loader-container">
        <img src="https://i.postimg.cc/wjKvWdkq/bouton-skate-color.png" 
        alt="loader" 
        className="loader-img" />
        <p id="loader-message">Recherche des spots...</p>
      </div>
    );
  }

  if (error) {
    return <p className='no-result'>{error}</p>;
  }

  return (
    <div id="spot-details-container">
      <h2 id="spot-details-title">{spot?.name}</h2>
      <p id="spot-details-description">{spot?.description}</p>
      <img src={spot?.picture} alt={spot?.name} id="spot-details-image" />
      <p id="spot-details-address">{spot?.address}</p>
      <p id="spot-details-rating">Rating: {spot?.rating}</p>
    </div>
  );
}
