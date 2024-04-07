import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Spot.css';
import StarRating from '../StarRating/StarRating';
import Carousel from 'react-bootstrap/Carousel';
import CommComponent from './CommComponent/CommComponent';
import FavoriteButton from '../FavButton/FavButton';

interface Picture {
  name: string;
  path: string;
}

interface Spot {
  id: number;
  name: string;
  description: string;
  picture: string; // URL de l'image principale
  address: string;
  rating: number;
  pictures: Picture[]; // Ajout de cette ligne
}

const API_BASE_URL = "https://balancetonspotapi.live/api/spot";
const FETCH_PICTURES = "https://balancetonspotapi.live/uploads/";

/*
 * Component for displaying the details of a spot.
 * 
 * @returns JSX element
 */
export default function SpotDetail() {
  const [spot, setSpot] = useState<Spot>({} as Spot); // Initializes as an empty object
  const [error, setError] = useState('');

  // Extracts the 'name' parameter from the URL using useParams with a generic type
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    /**
     * Fetches the details of the spot from the server.
     */
    const fetchSpotDetails = async () => {
      if (name) {
        try {
          const formattedSpotName = name.toLowerCase().replace(/\s/g, "-");
          const response = await axios.get<Spot>(`${API_BASE_URL}/${formattedSpotName}`);
          setSpot(response.data);
        } catch (err) {
          setError(' ');
        }
      }
    };

    fetchSpotDetails();
  }, [name]);

  if (error) {
    return <p className='no-result'>{error}</p>;
  }

  return (
    <div className='details-global-container'>
      <div id="spot-details-container">
        <h2 id="spot-details-title">{spot?.name}</h2>

        <Carousel fade>
          {spot.pictures && spot.pictures.map((picture, index) => (
            <Carousel.Item key={index}>
              <img className="spot-carousel-img" src={`${FETCH_PICTURES}${picture.path}`} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>

        <div id="ratings">
          <StarRating rating={spot?.rating || 0} id={spot?.id} /> {/* Adjusted to convert id to string */}
          <p>({spot?.rating})</p>
        </div>

        {/* Ensures spot?.id is converted to a string if your FavoriteButton expects a string type */}
        <FavoriteButton spotId={spot?.id} onToggle={() => { }} />

        <p id="spot-details-description">{spot?.description}</p>
        <p id="spot-details-address"><img src="/pin-solid-24.png" alt="Location pin" />{spot?.address}</p>

        <CommComponent spot={spot} />
        <div className="backtolist-button-container">
        <Link to="/spotslist">
        <button className="backtolist-button">
        {'<'} Retour à la liste
        </button>
      </Link>
      </div>
        
      </div>
      
    </div>
  );
}
