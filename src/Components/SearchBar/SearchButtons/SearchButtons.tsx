import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../../contextAPI/searchContext';
import './SearchButtons.css'

const API_BASE_URL = 'http://ombelinepinoche-server.eddi.cloud:8443/api';

export default function SearchButtons() {
    const { setSpots } = useContext(SearchContext) || {};
    const navigate = useNavigate();

    const fetchData = async (name: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${name}`);
            if (setSpots) {
            setSpots(response.data);
            }
            navigate('/spotslist');
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    return (
        <div className='buttons-search-container'>
            <button className='button-search' onClick={() => fetchData('spots')}>Tous les spots</button>
            <button className='button-search' onClick={() => fetchData('sport/snowboard/spots')}>Snowboard</button>
            <button className='button-search' onClick={() => fetchData('sport/skateboard/spots')}>Skateboard</button>
        </div>
    );
}

