import { useState, useContext } from "react";
import "./SpotsList.css";
import SearchContext from "../../contextAPI/searchContext.ts";

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
    const { spots } = useContext(SearchContext)
    
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

    return spots.length === 0 ? (
        <p className="no-result">
            C'est trop calme, j'aime pas trop beaucoup ça. J'préfère quand c'est un
            peu trop plus moins calme...
        </p>
    ) : (
        <div id="spotslist-container">

            {/* CARD SPOT */}
            {spots.map((spot: Spot) => (
                <div key={spot.id} id={`spotslist-${spot.id}`}>
                    <h2 id={`spotslist-title-${spot.id}`}>{spot.name}</h2>
                    <img
                        src={spot.picture}
                        alt={spot.name}
                        id={`spotslist-image-${spot.id}`}
                    />
                    <p id={`spotslist-description-${spot.id}`}>{spot.description}</p>
                    <p id={`spotslist-address-${spot.id}`}>{spot.address}</p>
                    <div id={`spotslist-rating-container-${spot.id}`}>

                        {/* Input Rating */}
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value}>
                                    <input
                                        type="radio"
                                        name={`rating-${spot.id}`}
                                        value={value}
                                        checked={rating[spot.id] === value}
                                        onChange={(e) =>
                                            handleRatingChange(spot.id, Number(e.target.value))
                                        }
                                    />
                                    <span className="star"></span>
                                </label>
                            ))}
                        </div>

                        {/* BUTTON FAVS */}
                        <div>
                            <button
                                onClick={() => handleFavoriteToggle(spot.id)}
                                id={`spotslist-button-${spot.id}`}
                                aria-label="toggle favorite"
                            >
                                {isFavorite[spot.id] ? <img src="https://i.postimg.cc/BQgtKhT4/heart-solid-24-1.png"></img> : <img src="https://i.postimg.cc/bY1ZzYdG/heart-regular-24-2.png"></img>}
                            </button>
                        </div>


                        {/* BUTTON DETAILS */}
                        <button
                            onClick={() => {
                                window.location.href = `/spot/${spot.name.toLowerCase().replace(/\s+/g, '-')}`;
                            }}
                            id={`spotslist-detail-button-${spot.name}`}
                        >
                            Voir le détail
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
