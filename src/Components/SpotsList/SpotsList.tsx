import React, { useState, useContext } from 'react';
import './SpotsList.css';
import SearchContext from '../../contextAPI/searchContext.ts';

export default function SpotsList() {
    const [rating, setRating] = useState<{ [key: number]: number }>({});
    const [isFavorite, setIsFavorite] = useState<{ [key: number]: boolean }>({});

    const { spots } = useContext(SearchContext);

    const handleRatingChange = (spotId: number, value: number) => {
        setRating((prevRating) => ({
            ...prevRating,
            [spotId]: value,
        }));
    };

    const handleFavoriteToggle = (spotId: number) => {
        setIsFavorite((prevIsFavorite) => ({
            ...prevIsFavorite,
            [spotId]: !prevIsFavorite[spotId],
        }));
    };

    return (
        <div id="spotslist-container">
            {spots.map((spot: any) => (
                <div key={spot.id} id={`spotslist-${spot.id}`}>
                    <h2 id={`spotslist-title-${spot.id}`}>{spot.name}</h2>
                    <p id={`spotslist-description-${spot.id}`}>{spot.description}</p>
                    <img src={spot.picture} alt={spot.name} id={`spotslist-image-${spot.id}`} />
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
                    <button onClick={() => handleFavoriteToggle(spot.id)} id={`spotslist-button-${spot.id}`}>
                        {isFavorite[spot.id] ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ))}
        </div>
    );
}
