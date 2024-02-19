import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Spot.css';
import StarRating from '../StarRating/StarRating';
import Carousel from 'react-bootstrap/Carousel';

import CommComponent from './CommComponent/CommComponent';
import FavoriteButton from '../FavButton/FavButton';

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
        } catch (err) {
          setError('404');
        }
      }
    };

    fetchSpotDetails();
  }, [name]); // Add 'name' as a dependency for useEffect

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

        <FavoriteButton spotId={spot?.id} />

        <p id="spot-details-description">{spot?.description}</p>
        <p id="spot-details-address"><img src="https://i.postimg.cc/P5YNtVhs/pin-solid-24.png"></img>{spot?.address}</p>

        <CommComponent spot={spot} />

      </div>

    </div>
  );
}
