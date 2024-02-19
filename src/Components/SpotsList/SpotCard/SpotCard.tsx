import './SpotCard.css'
import StarRating from '../../StarRating/StarRating';
import FavoriteButton from '../../FavButton/FavButton';

export default function SpotCard({ spot }) {
    return (
        <div key={spot.id} id="spotslist">
            <h2 id="spotslist-title">{spot.name}</h2>
            <img src={spot.picture} alt={spot.name} id="spotslist-image" />

            <div className="spotslist-content">
                <StarRating
                    id={spot.id}
                    rating={spot.rating || 0} // Utilisez la note du spot ou 0 si non défini
                />

                {/* BUTTON FAVS */}
                <FavoriteButton spotId={spot.id} />

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
    )
}
