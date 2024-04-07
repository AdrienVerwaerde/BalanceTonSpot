// Import necessary hooks and libraries
import { useEffect, useState } from 'react';
import 'animate.css/animate.min.css';
import axios from 'axios';
import './FavButton.css';
import Swal from 'sweetalert2';

// Defines props type for FavoriteButton component
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
            }, 300); // Duration of the animation

            return () => clearTimeout(timer);
        }
    }, [animate]); // Dependency array to re-run the effect when animate changes

    // Effect hook to check favorite status on component mount and when spotId or token changes
    useEffect(() => {
        // Function to check if the current spot is a favorite
        const checkFavoriteStatus = async () => {
            if (token) {
                try {
                    const response = await axios.get(`https://balancetonspotapi.live/api/favorites`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const favorites = response.data;
                    // Sets the isFavorite state based on if the current spot is in the favorites list
                    setIsFavorite(favorites.some((fav: { id: number }) => fav.id === spotId));
                } catch (err) {
                    console.error('Error fetching favorite status:', err);
                }
            }
        };
        checkFavoriteStatus();
    }, [spotId, token]); // Dependencies array to re-run the effect when these values change

    /**
     * Function to toggle the favorite status
     */ 
    const toggleFavorite = async () => {
        if (!token) { //If there is no token, display popup alert
            Swal.fire({
                title: 'Erreur',
                text: "Il faut être connecté.e pour ajouter un favori !",
                icon: 'error',
                confirmButtonText: 'Ça roule',
                buttonsStyling: false,
                scrollbarPadding: false
            });
        }
        try {
            if (isFavorite) {
                // If the spot is already a favorite, remove it from favorites
                await axios.delete(`https://balancetonspotapi.live/api/favorites/${spotId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                // If the spot is not a favorite, add it to favorites
                await axios.post(`https://balancetonspotapi.live/api/favorites/${spotId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            // Updates the favorite status and trigger animation
            setAnimate(true);
            setIsFavorite(!isFavorite);
            onToggle();
        } catch (error) {
            console.error('Error updating favorite status:', error)
        }
    };

    // Renders the favorite button with conditional rendering based on the isFavorite state
    return (
        <button className="button-fav" onClick={toggleFavorite} aria-label="toggle favorite">
            {isFavorite ? (
                <img className={animate ? "animate__animated animate__heartBeat" : ""} src="/heart-solid-24-1.png" alt="Remove from favorites" />
            ) : (
                <img className={animate ? "animate__animated animate__heartBeat" : ""} src="/heart-regular-24-2.png" alt="Add to favorites" />
            )}
        </button>
    );
};

