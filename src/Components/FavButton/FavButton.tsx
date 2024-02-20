// Import necessary hooks and libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import './FavButton.css';

// Define props type for FavoriteButton component
interface FavoriteButtonProps {
    spotId: number; // Type of spotId is string
    onToggle: () => void; // onToggle is a function that doesn't take any arguments and doesn't return anything
}

// FavoriteButton component definition with props typed according to the interface
export default function FavoriteButton({ spotId, onToggle }: FavoriteButtonProps) {
    // State to manage favorite status
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    // State to manage animation
    const [animate, setAnimate] = useState<boolean>(false);
    // Retrieve the user token from local storage
    const token = localStorage.getItem('userToken');

    // Effect for handling the addition/removal of animation
    useEffect(() => {
        if (animate) {
            // Reset animation state after the animation is finished
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 300); // Duration should match CSS animation duration

            return () => clearTimeout(timer);
        }
    }, [animate]); // Dependency array to re-run the effect when animate changes

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
                    setIsFavorite(favorites.some((fav: { id: number }) => fav.id === spotId));
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
            // Update favorite status and trigger animation
            setIsFavorite(!isFavorite);
            setAnimate(true);
            onToggle();
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    // Render the favorite button with conditional rendering based on the isFavorite state
    return (
        <button className="button-fav" onClick={toggleFavorite} aria-label="toggle favorite">
            {isFavorite ? (
                <img className={`${animate ? 'shimmer-effect' : ''}`} src="https://i.postimg.cc/BQgtKhT4/heart-solid-24-1.png" alt="Remove from favorites" />
            ) : (
                <img className={`${animate ? 'shimmer-effect' : ''}`} src="https://i.postimg.cc/bY1ZzYdG/heart-regular-24-2.png" alt="Add to favorites" />
            )}
        </button>
    );
};

