// Import necessary hooks and libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import './FavButton.css';

// FavoriteButton component definition
export default function FavoriteButton({ spotId }) {
    // State to manage favorite status
    const [isFavorite, setIsFavorite] = useState(false);
    // Retrieve the user token from local storage
    const token = localStorage.getItem('userToken');

    // Effect hook to check favorite status on component mount and when spotId or token changes
    useEffect(() => {
        // Function to check if the current spot is a favorite
        const checkFavoriteStatus = async () => {
            if (token) {
                try {
                    const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/favorites`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const favorites = response.data;
                    // Set the isFavorite state based on if the current spot is in the favorites list
                    setIsFavorite(favorites.some(fav => fav.id === spotId));
                } catch (err) {
                    console.error('Error fetching favorite status:', err);
                }
            }
        };
        checkFavoriteStatus();
    }, [spotId, token]); // Dependencies array to re-run the effect when these values change

     // Function to toggle the favorite status
      const toggleFavorite = async () => {
      if (!token) {
          alert('Vous devez être connecté pour effectuer cette action.');
          return;
      }
      try {
          if (isFavorite) {
              // If the spot is already a favorite, remove it from favorites
              await axios.delete(`http://ombelinepinoche-server.eddi.cloud:8443/api/favorites/${spotId}`, {
                  headers: { Authorization: `Bearer ${token}` },
              });
          } else {
              // If the spot is not a favorite, add it to favorites
              await axios.post(`http://ombelinepinoche-server.eddi.cloud:8443/api/favorites/${spotId}`, {}, {
                  headers: { Authorization: `Bearer ${token}` },
              });
          }
          // Toggle the isFavorite state
          setIsFavorite(!isFavorite);
      } catch (error) {
          console.error('Error updating favorite status:', error);
      }
  };

    // Render the favorite button with conditional rendering based on the isFavorite state
    return (
        <button className="button-fav" onClick={toggleFavorite} aria-label="toggle favorite">
            {isFavorite ? (
                <img src="https://i.postimg.cc/BQgtKhT4/heart-solid-24-1.png" alt="Remove from favorites" />
            ) : (
                <img src="https://i.postimg.cc/bY1ZzYdG/heart-regular-24-2.png" alt="Add to favorites" />
            )}
        </button>
    );
};
