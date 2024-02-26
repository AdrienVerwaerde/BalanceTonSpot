import { useState, useRef, useEffect, useContext } from 'react'
import Fade from 'react-bootstrap/Fade';
import { Link } from 'react-router-dom';
import './ProfileButton.css'
import ThemeContext from '../../../contextAPI/themeContext';  
import axios from 'axios';

const API_USER = "http://ombelinepinoche-server.eddi.cloud:8443/api/user";
const FETCH_PICTURES = "http://ombelinepinoche-server.eddi.cloud:8443/uploads/";

export default function ProfileButton() {
  //This function uses useState to toggle the list of options from the button
  const [open, setOpen] = useState(false);
  //This function will make the menu close when we click outside of it
  const menuRef = useRef<HTMLDivElement>(null);
  //This function will check if the menu is already active
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ pseudo: '', profilPicture: ''});

  const { theme } = useContext(ThemeContext) || {};
  const listGroupItem = `list-group-item list-group-item-${theme}`;
  

  useEffect(() => {
    // Adds an event listener on the whole document to detect when we click anywhere but on the button and also allows to close the menu by clicking the button again
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Vérifiez si l'utilisateur est connecté et récupérez ses données
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

/**
 *  Fonction pour récupérer les données utilisateur à partir du token
 */ 
const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assurez-vous que la clé correspond exactement à celle dans response.data
    setUser({ 
      pseudo: response.data.pseudo, 
      profilPicture: response.data.profilpicture || '', // Utilisez la bonne clé ici
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur', error);
  }
};

  return (
    <div className='profile-btn-container'>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="shadow-none btn btn-primary btn-profile mb-5">
        <img id="button-img" src={isLoggedIn ? `${FETCH_PICTURES}${user.profilPicture}` : "/src/assets/images/profile-button.png"} alt="Profile button"></img>
      </button>
      {isLoggedIn && <span id="profile-button-pseudo">{user.pseudo}</span>}
      <div ref={menuRef} style={{ minHeight: '150px' }}>
        <Fade in={open}>
          <ul className="list-group">
            {isLoggedIn ? (
              // Displayed if user is logged in
              <>
                <Link to="/profile"><li className={listGroupItem}>PROFIL</li></Link>
                <Link to="/favoris"><li className={listGroupItem}>FAVORIS</li></Link>
                <Link to="/" onClick={() => {localStorage.removeItem('userToken'); setIsLoggedIn(false);}}><li className={listGroupItem}>DECONNEXION</li></Link>
              </>
            ) : (
              // Displayed if user isn't logged in
              <>
                <Link to="/login"><li className={listGroupItem}>CONNEXION</li></Link>
                <Link to="/signup"><li className={listGroupItem}>INSCRIPTION</li></Link>
              </>
            )}
          </ul>
        </Fade>
      </div>
    </div>
  );
}

