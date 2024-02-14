import { useState, useContext } from "react";
import "./SpotsList.css";
import SearchContext from "../../contextAPI/searchContext.ts";
import StarRating from "../StarRating/StarRating.tsx";

interface Spot {
    rating: number;
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
     * State variable to store whether each spot is marked as favorite or not.
     */
    const [isFavorite, setIsFavorite] = useState<{ [key: number]: boolean }>({});
    const [tri, setTri] = useState({ triPar: 'rating', order: 'desc' });

    /**
     * Context variable to access the spots data.
     */
    const { spots } = useContext(SearchContext);

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

    /**
     * Sorts spots based on the selected criteria.
     */
    const triSpots = () => {
        return [...spots].sort((a, b) => {
            // Tri par note
            if (tri.triPar === 'rating') {
                return tri.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
            // Tri par type de sport
            else if (tri.triPar === 'sport') {
                // En cas d'égalité de type de sport, vous pouvez choisir de les trier par note ou tout autre attribut
                if (a.sport === b.sport) {
                    // Ici, par défaut, on trie encore par note si les types de sport sont égaux
                    // Cela assure un sous-tri cohérent
                    return tri.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
                }
                return tri.order === 'asc' ? a.sport.localeCompare(b.sport) : b.sport.localeCompare(a.sport);
            }
        });
    };
    
    return (
        <div id="spotslist-container">
            <div>
                <select value={tri.triPar} onChange={(e) => setTri({ ...tri, triPar: e.target.value })}>
                    <option value="rating">Par Note</option>
                    <option value="sport">Par Sport</option>
                </select>
                <select value={tri.order} onChange={(e) => setTri({ ...tri, order: e.target.value })}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            {/* CARD SPOT */}
            {triSpots().map((spot: Spot) => (
                <div key={spot.id} id="spotslist">
                    <h2 id="spotslist-title">{spot.name}</h2>
                    <img src={spot.picture} alt={spot.name} id="spotslist-image" />

                    <div className="spotslist-content">
                        <StarRating
                            id={spot.id}
                            rating={spot.rating || 0} // Utilisez la note du spot ou 0 si non défini
                        />

                        {/* BUTTON FAVS */}
                        <div>
                            <button
                                onClick={() => handleFavoriteToggle(spot.id)}
                                id="spotslist-button-fav"
                                aria-label="toggle favorite"
                            >
                                {isFavorite[spot.id] ? (
                                    <img src="https://i.postimg.cc/BQgtKhT4/heart-solid-24-1.png"></img>
                                ) : (
                                    <img src="https://i.postimg.cc/bY1ZzYdG/heart-regular-24-2.png"></img>
                                )}
                            </button>
                        </div>

                        <p id="spotslist-description">{spot.description.length > 150 ? `${spot.description.slice(0, 150)}...` : spot.description}</p>
                        <p id="spotslist-address"><img src="https://i.postimg.cc/P5YNtVhs/pin-solid-24.png"></img>{spot.address}</p>
                        
                            {/* BUTTON DETAILS */}
                            <button
                                onClick={() => {
                                    window.location.href = `/spot/${spot.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`;
                                }}
                                id="spotslist-button-detail"
                            >
                            Voir le détail
                            </button>
                        </div>
                    </div>
            ))}
        </div>
)}
