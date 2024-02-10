import { useState, useContext } from 'react';
import './SpotsList.css';
import SearchContext from '../../contextAPI/searchContext.ts';

interface Spot {
    id: number;
    name: string;
    description: string;
    picture: string;
    address: string;
}

/**
 * Component that renders a list of spots.
 */
export default function SpotsList() {
    /**
     * State variable to store the rating of each spot.
     */
    const [rating, setRating] = useState<{ [key: number]: number }>({});

    /**
     * State variable to store whether each spot is marked as favorite or not.
     */
    const [isFavorite, setIsFavorite] = useState<{ [key: number]: boolean }>({});

    /**
     * Context variable to access the spots data.
     */
    const { spots } = useContext(SearchContext) || {}; // Add default value of empty object

    /**
     * Handler function to update the rating of a spot.
     * @param spotId - The ID of the spot.
     * @param value - The new rating value.
     */
    const handleRatingChange = (spotId: number, value: number) => {
        setRating((prevRating) => ({
            ...prevRating,
            [spotId]: value,
        }));
    };

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

    return (
        spots.length === 0 ? (
            <p className="no-result">C'est trop calme, j'aime pas trop beaucoup ça. J'préfère quand c'est un peu trop plus moins calme...</p>
        ) : (
            <div id="spotslist-container">
                {spots.map((spot: Spot) => (
                    <div key={spot.id} id={`spotslist-${spot.id}`}>
                        <h2 id={`spotslist-title-${spot.id}`}>{spot.name}</h2>
                        <p id={`spotslist-description-${spot.id}`}>{spot.description}</p>
                        <img
                            src={spot.picture}
                            alt={spot.name}
                            id={`spotslist-image-${spot.id}`}
                        />
                        <p id={`spotslist-address-${spot.id}`}>{spot.address}</p>
                        <div id={`spotslist-rating-container-${spot.id}`}>
                            <label htmlFor={`rating-${spot.id}`} id={`spotslist-label-${spot.id}`}>
                                Rating:
                            </label>
                            <input
                                type="number"
                                id={`rating-${spot.id}`}
                                value={rating[spot.id] || ''}
                                onChange={(e) => handleRatingChange(spot.id, Number(e.target.value))}
                            />
                        </div>
                        <button
                            onClick={() => handleFavoriteToggle(spot.id)}
                            id={`spotslist-button-${spot.id}`}>
                            {isFavorite[spot.id] ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                ))}
            </div>
        )
    )
}
