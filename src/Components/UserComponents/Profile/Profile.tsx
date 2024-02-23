import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Swal from 'sweetalert2'

/**
 * Component for the user profile dashboard.
 */
export default function UserProfileDashboard() {
    const [user, setUser] = useState({
        pseudo: '',
        email: '',
        firstname: '',
        lastname: '', 
        profilPicture: ''
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    /**
     * Fetches user data from the server.
     */
    const fetchUserData = async () => {
        const token = localStorage.getItem('userToken');
        if (token && token.trim() !== '') {
            try {
                const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser({
                    pseudo: response.data.pseudo,
                    email: response.data.email,
                    firstname: response.data.firstname || '',
                    lastname: response.data.lastname || '', 
                    profilPicture: response.data.profilpicture,
                });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        } else {
            console.log('No token found or token is invalid');
        }
    };

    /**
     * Handles form input changes.
     * @param e - The event object.
     */
    const handleChange = (e: { target: { name: unknown; value: unknown; }; }) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name as string]: value,
        }));
    };

    /**
     * Handles profile picture change.
     * @param e - The event object.
     */
    const defaultProfilePicture = ''; // Defines defaultProfilePicture variable

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevState => ({
                    ...prevState,
                    profilPicture: reader.result ? reader.result.toString() : defaultProfilePicture,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    };

    /**
     * Handles form submission.
     * @param e - The event object.
     */
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const formData = new FormData();
                formData.append('pseudo', user.pseudo);
                formData.append('email', user.email);
                formData.append('firstname', user.firstname);
                formData.append('lastname', user.lastname);

                if (user.profilPicture.startsWith('data:image')) {
                    formData.append('profilPicture', user.profilPicture);
                }
                
                await axios.put(`http://ombelinepinoche-server.eddi.cloud:8443/api/user`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Pop-up alert component 
                Swal.fire({
                    title: "Profil mis à jour",
                    text: 'Tout beau, tout propre !',
                    icon: "success",
                    color: "#000000",
                    background: "#ffffff",
                    backdrop: `#e3e3e36z`,
                    buttonsStyling: false,
                    confirmButtonText: 'OK',
                    scrollbarPadding: false  
                });
            } catch (error) {
                console.error('Error updating profile', error);
                // Pop-up alert component 
                Swal.fire({
                    title: 'Erreur',
                    text: 'Veuillez réessayer plus tard. (phrase bateau... je sais)',
                    icon: 'error',
                    color: "#000000",
                    background: "#ffffff",
                    backdrop: `#e3e3e36z`,
                    buttonsStyling: false,
                    confirmButtonText: 'OK',
                    scrollbarPadding: false 
                });
            }
        }
    };

    return (
        <main>
            <div className='user-profile-wrapper'>
                <form className='user-form' onSubmit={handleSubmit}>
                    <h2>Bonjour, {user.pseudo}</h2>
                    <div className="form-group">
                        <label htmlFor="profilePicture">Image de Profil</label>
                        <img className="profile-dashboard-img" src={user.profilPicture} alt="Profilpicture" style={{ width: '10em', height: '10em', borderRadius: '50%' }} />
                        <input type="file" id="profilPicture" onChange={handleProfilePictureChange} accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pseudo">Nom affiché</label>
                        <input type="text" id="pseudo" name="pseudo" value={user.pseudo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" id="firstname" name="firstname" value={user.firstname} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom de famille</label>
                        <input type="text" id="lastname" name="lastname" value={user.lastname} onChange={handleChange} />
                    </div>
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </main>
    );
}
