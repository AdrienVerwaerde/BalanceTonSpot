// Import necessary CSS and components
import './SpotCard.css';
import StarRating from '../../StarRating/StarRating';
import FavoriteButton from '../../FavButton/FavButton';

// Define the type for the 'spot' prop
interface Spot {
    id: number;
    name: string;
    picture: string;
    rating?: number; // 'rating' is optional and can be undefined
    description: string;
    address: string;
}

// Define the props type for the SpotCard component
interface SpotCardProps {
    spot: Spot;
    onFavoriteToggle: () => void; // onFavoriteToggle is a function that doesn't take any arguments and doesn't return anything
}

// SpotCard component definition with props typed according to the interface
export default function SpotCard({ spot, onFavoriteToggle }: SpotCardProps) {
    return (
        <div key={spot.id} id="spotslist">
            <h2 id="spotslist-title">{spot.name}</h2>
            <img src={spot.picture} alt={spot.name} id="spotslist-image" />

            <div className="spotslist-content">

                <div id="ratings">
                    {/* Render StarRating component with the current spot's rating or 0 if undefined */}
                    <StarRating
                        id={spot.id}
                        rating={spot.rating || 0} 
                    />
                    <p>({spot.rating})</p>
                </div>

                {/* FavoriteButton component */}
                <FavoriteButton spotId={spot.id} onToggle={onFavoriteToggle} />

                {/* Shortening the description if it's longer than 150 characters */}
                <p id="spotslist-description">{spot.description.length > 150 ? `${spot.description.slice(0, 150)}...` : spot.description}</p>
                
                {/* Displaying the spot's address with an icon */}
                <p id="spotslist-address"><img src="https://i.postimg.cc/P5YNtVhs/pin-solid-24.png" alt="Location pin"/>{spot.address}</p>

                {/* Detail button to navigate to the spot's detailed page */}
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
    )
}
