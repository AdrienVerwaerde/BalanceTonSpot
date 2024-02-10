import { useEffect, useState } from 'react';
import axios from 'axios';
import './Spot.css';

interface Spot {
  name: string;
  description: string;
  picture: string;
  address: string;
  rating: number;
}

/**
 * Component that displays the details of a spot.
 * @param spotId - The ID of the spot.
 * @returns JSX element representing the spot details.
 */
export default function SpotDetails({ spotId }: { spotId: string }) {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    /**
     * Fetches the details of the spot from the server.
     */
    const fetchSpotDetails = async () => {
      try {
        const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${spotId}`);
        setSpot(response.data);
        setLoading(false);
      } catch (err) {
        setError('Petit problème de Fetch pour les détails du spot...');
        setLoading(false);
      }
    };

    fetchSpotDetails();
  }, [spotId]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="ride-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
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
