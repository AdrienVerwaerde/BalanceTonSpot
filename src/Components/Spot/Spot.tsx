import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Spot.css';
import StarRating from '../StarRating/StarRating';
import Carousel from 'react-bootstrap/Carousel';

import CommComponent from './CommComponent/CommComponent';


// Interface TS for spot
interface spot {
  id: number;
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
  const [spot, setSpot] = useState<spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState<{ [key: number]: boolean }>({});

  /**
    * Handler function to toggle the favorite status of a spot.
    * @param spotId - The ID of the spot.
    */
  const handleFavoriteToggle = (spotId: number) => {
    setIsFavorite((prevIsFavorite) => ({
      ...prevIsFavorite,
      [spotId]: !prevIsFavorite[spotId],
    }));
  };

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
    <div className='details-global-container'>
      <div id="spot-details-container">
        <h2 id="spot-details-title">{spot?.name}</h2>

        {/*CARROUSEL*/}
        <Carousel fade>
          <Carousel.Item>
            <img src={spot?.picture} alt="First slide" />
            <Carousel.Caption>
              <h3>CECI</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={spot?.picture} alt="First slide" />
            <Carousel.Caption>
              <h3>EST UN TRÈS BEAU</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={spot?.picture} alt="First slide" />
            <Carousel.Caption>
              <h3>SLIDER</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div id="ratings">
          <StarRating rating={spot?.rating || 0} id={0} />
          <p>({spot?.rating})</p>
        </div>
        <button
          onClick={() => handleFavoriteToggle(spot?.id ?? 0)}
          id="spotslist-button-fav"
          aria-label="toggle favorite"
        >
          {isFavorite[spot?.id ?? 0] ? (
            <img src="https://i.postimg.cc/BQgtKhT4/heart-solid-24-1.png"></img>
          ) : (
            <img src="https://i.postimg.cc/bY1ZzYdG/heart-regular-24-2.png"></img>
          )}
        </button>

        <p id="spot-details-description">{spot?.description}</p>
        <p id="spot-details-address"><img src="https://i.postimg.cc/P5YNtVhs/pin-solid-24.png"></img>{spot?.address}</p>

        <CommComponent spot={spot} />

      </div>

    </div>
  );
}
