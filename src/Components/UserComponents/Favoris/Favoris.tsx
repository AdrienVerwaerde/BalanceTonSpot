// Import necessary hooks, libraries, and components
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favoris.css';
import SpotCard from '../../SpotsList/SpotCard/SpotCard';

// Define the structure for a spot object
interface Spot {
    id: number;
    name: string;
    picture: string;
    rating?: number;
    description: string;
    address: string;
}

export default function Favoris() {
    // State to store the list of favorite spots
    const [spots, setSpots] = useState<Spot[]>([]);

    // Fetch favorite spots on component mount
    useEffect(() => {
        fetchFavoriteSpots();
    }, []);

    /**
     * Fetches the favorite spots for the user.
     * 
     * A promise that resolves when the favorite spots are fetched.
     */
    const fetchFavoriteSpots = async () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            const response = await axios.get('http://ombelinepinoche-server.eddi.cloud:8443/api/favorites', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSpots(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setSpots([]);
            } else {
                console.error('Error fetching favorite spots:', error);
            }
        }
    }
};

    // Render message if there are no favorite spots
    if (!spots || spots.length === 0) {
        return <div className="fav-none-title"><h2>Aucun spot en favoris.</h2></div>;
    }

    // Render favorite spots using the SpotCard component
    return (
        <main>
            <div className="favs-container">
                <h1 id="fav-title">SPOTS FAVORIS</h1>
                {spots.map((spot) => (
                    <SpotCard key={spot.id} spot={spot} onFavoriteToggle={fetchFavoriteSpots} />
                ))}
            </div>
        </main>
    );
};




