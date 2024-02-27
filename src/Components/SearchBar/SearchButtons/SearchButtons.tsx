// Import necessary dependencies
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../../contextAPI/searchContext';
import './SearchButtons.css';

// Defines the base URL for the API
const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

// Defines the SearchButtons component
export default function SearchButtons() {
    // Gets the setSpots function from the SearchContext
    const { setSpots } = useContext(SearchContext) || {};

    // Gets the navigate function from react-router-dom
    const navigate = useNavigate();

    // Defines the fetchData function to fetch data from the API
    const fetchData = async (name: string) => {
        try {
            // Sends a GET request to the API with the specified name
            const response = await axios.get(`${API_BASE_URL}/${name}`);

            // If setSpots function is available, updates the spots data in the SearchContext
            if (setSpots) {
                setSpots(response.data);
            }

            // Navigates to the '/spotslist' route
            navigate('/spotslist');
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    // Renders the buttons and attaches onClick event handlers to fetchData function
    return (
        <div className='buttons-search-container'>
            <button className='button-search' onClick={() => fetchData('spots')}>Tous les spots</button>
            <button className='button-search' onClick={() => fetchData('sport/snowboard/spots')}>Snowboard</button>
            <button className='button-search' onClick={() => fetchData('sport/skateboard/spots')}>Skateboard</button>
        </div>
    );
}

