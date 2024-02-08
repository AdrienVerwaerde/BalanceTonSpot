import React, { useState, useEffect } from 'react';

// Import of axios to make requests to the API
import axios from 'axios';



export default function SpotsList() {
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [spotslist, setSpots] = useState([]);

    async function fetchSpots() {
        try {
            const response = await axios.get('http://ombeline-pinoche.vpnuser.lan:8080/api/spots');
            setSpots(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSpots();
    }, []);

    console.log(spotslist);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            {spotslist.map((spot) => (
                <div key={spot.id}>
                    <h2>{spot.name}</h2>
                    <p>{spot.description}</p>
                    <img src={spot.picture} alt={spot.name} />
                    <p>{spot.address}</p>
                    <div>
                        <label htmlFor={`rating-${spot.id}`}>Rating:</label>
                        <input
                            type="number"
                            id={`rating-${spot.id}`}
                            value={rating[spot.id] || ''}
                            onChange={(e) => handleRatingChange(spot.id, e.target.value)}
                        />
                    </div>
                    <button onClick={() => handleFavoriteToggle(spot.id)}>
                        {isFavorite[spot.id] ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            ))}
        </div>
    );
};