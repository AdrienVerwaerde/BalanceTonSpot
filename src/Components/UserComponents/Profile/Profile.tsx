import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const defaultProfilePicture = 'https://i.postimg.cc/0jKQyGYc/default-profile.png';

export default function UserProfileDashboard() {
    const [user, setUser] = useState({
        pseudo: '',
        email: '',
        firstname: '',
        lastname: '', 
        profilePicture: defaultProfilePicture,
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    // Fetch user data from the server
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
                    profilePicture: response.data.profilpicture || defaultProfilePicture,
                });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        } else {
            console.log('No token found or token is invalid');
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser(prevState => ({
                    ...prevState,
                    profilePicture: reader.result ? reader.result.toString() : defaultProfilePicture,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const formData = new FormData();
                formData.append('pseudo', user.pseudo);
                formData.append('email', user.email);
                formData.append('firstname', user.firstname);
                formData.append('lastname', user.lastname);

                if (user.profilePicture.startsWith('data:image')) {
                    formData.append('profilePicture', user.profilePicture);
                }

                await axios.patch(`http://ombelinepinoche-server.eddi.cloud:8443/api/user`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile', error);
                alert('Failed to update profile.');
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
                        <img className="profile-dashboard-img" src={user.profilePicture} alt="Profile" style={{ width: '10em', height: '10em', borderRadius: '50%' }} />
                        <input type="file" id="profilePicture" onChange={handleProfilePictureChange} accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pseudo">Nom</label>
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
