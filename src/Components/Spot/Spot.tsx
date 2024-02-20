import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Spot.css';
import StarRating from '../StarRating/StarRating';
import Carousel from 'react-bootstrap/Carousel';
import CommComponent from './CommComponent/CommComponent';
import FavoriteButton from '../FavButton/FavButton';

// TypeScript interface for Spot details
interface Spot {
  id: number; // Assuming id is numeric, adjust based on your backend
  name: string;
  description: string;
  picture: string;
  address: string;
  rating: number;
}

// TypeScript interface for Picture
interface Picture {
  id: number;
  path: string;
}

/**
 * Component that displays details of a spot.
 */
export default function SpotDetail() {
  const [spot, setSpot] = useState<Spot>({} as Spot); // Initialize as an empty object
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [error, setError] = useState('');

  // Extract the 'name' parameter from the URL using useParams with a generic type
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const fetchSpotDetails = async () => {
      if (name) {
        try {
          const formattedSpotName = name.toLowerCase().replace(/\s/g, "-");
          const response = await axios.get<Spot>(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}`);
          setSpot(response.data);
        } catch (err) {
          setError('Spot not found.'); // More user-friendly error message
        }
      }
    };

    fetchSpotDetails();
  }, [name]); // Depend on 'name' to refetch when it changes

  useEffect(() => {
    const fetchSpotPictures = async () => {
      if (name) {
        try {
          const formattedSpotName = name.toLowerCase().replace(/\s/g, "-");
          const response = await axios.get<Picture[]>(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}/pictures`);
          setPictures(response.data);
        } catch (err) {
          console.error("Error fetching pictures:", err);
        }
      }
    };

    fetchSpotPictures();
  }, [name]);

  if (error) {
    return <p className='no-result'>{error}</p>;
  }

  return (
    <div className='details-global-container'>
      <div id="spot-details-container">
        <h2 id="spot-details-title">{spot?.name}</h2>

        <Carousel fade>
          {pictures.map((picture, index) => (
            <Carousel.Item key={index}>
              <img className="spot-carousel-img" src={picture.path} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>

        <div id="ratings">
          <StarRating rating={spot?.rating || 0} id={spot?.id} /> {/* Adjusted to convert id to string */}
          <p>({spot?.rating})</p>
        </div>

        {/* Ensure spot?.id is converted to a string if your FavoriteButton expects a string type */}
        <FavoriteButton spotId={spot?.id} onToggle={() => {}} /> {/* Placeholder function for onToggle */}

        <p id="spot-details-description">{spot?.description}</p>
        <p id="spot-details-address"><img src="https://i.postimg.cc/P5YNtVhs/pin-solid-24.png" alt="Location pin"/>{spot?.address}</p>

        <CommComponent spot={spot} />
      </div>
    </div>
  );
}
