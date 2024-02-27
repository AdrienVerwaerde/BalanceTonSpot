import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './Slideshow.css';
import ThemeContext from '../../../contextAPI/themeContext';

const FETCH_PICTURES = "http://ombelinepinoche-server.eddi.cloud:8443/uploads/";
interface spot {
  name: string;
  description: string;
  picture: string;
}

const delay = 4000;

export default function Slideshow() {
  //Gets the current theme
  const { theme } = useContext(ThemeContext) || { theme: 'skate' };
  // State variable to store the spots data
  const [spots, setSpots] = useState([]); 
  // State variable to store the current index of the slideshow
  const [index, setIndex] = useState(0); 
  // Reference to the timeout used for automatic slideshow
  const timeoutRef = useRef<number>(); 

  // Function to reset the timeout
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout if it exists
    }
  }

  useEffect(() => {
    // Fetches spots data based on the selected theme
    const fetchSpots = async () => {
      if (!theme) {
        console.log("Pilule Bleu ou Pilule Rouge ?"); // Logs a message if the theme is not set
        return;
      }

      try {
        /**
         * Gets the spots data depending of the selected theme
         */
        const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/sport/${theme}/spots`);
        setSpots(response.data.slice(0, 3)); // Sets the spots data in the state variable
      } catch (error) {
        console.error("Erreur lors de la récupération des spots:", error); // Logs an error message if there is an error fetching the spots data
      }
    };

    fetchSpots(); // Calls the fetchSpots function
  }, [theme]);

  useEffect(() => {
    resetTimeout(); // Resets the timeout when the index or spots length changes
    timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === spots.length - 1 ? 0 : prevIndex + 1), delay); // Updates the index after a delay

    return () => {
      resetTimeout(); // Clears the timeout when the component unmounts
    };
  }, [index, spots.length]);

  // Function to handle mouse enter event
  function handleMouseEnter() {
    resetTimeout(); // Resets the timeout when the mouse enters the slideshow
  }

  // Function to handle mouse leave event
  function handleMouseLeave() {
    resetTimeout(); // Resets the timeout when the mouse leaves the slideshow
    timeoutRef.current = setTimeout(() => setIndex(prevIndex => prevIndex === spots.length - 1 ? 0 : prevIndex + 1), delay); // Updates the index after a delay
  }

  return (
    <div className="slideshow" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {spots.map((spot: spot, idx: number) => (
          <div className="slide" key={idx}>

            {/* The link to selected spots on the slideshow */}
            <div id="spotlight" onClick={() => {
              {/* Sends the user to the details of the spot after clicking the link */}
              window.location.href = `/spot/${spot.name.toLowerCase().replace(/\s+/g, '-')}`; // Ensures the name corresponds to the format set in backoffice
            }}>
              <h2 id="spotlight-title">SPOTLIGHT : {spot.name}</h2>
              {/* Sets maximum length of spot description to 150 characters*/}
              <p id="spotlight-text">{spot.description.length > 150 ? `${spot.description.slice(0, 150)}...` : spot.description}</p> 
              <p>Découvrir {'>>'}</p>
            </div>

            <img id="slideshow-img" src={`${FETCH_PICTURES}${spot.picture}`} alt="" />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {spots.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => setIndex(idx)}></div>
        ))}
      </div>
    </div>
  );
}