import React, { useState, useEffect } from 'react';
import './Profile.css';

/**
 * Composant de tableau de bord du profil utilisateur.
 */
export default function UserProfileDashboard() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        profilePicture: '',
    });

    useEffect(() => {
        setUser({
            name: 'John Doe',
            email: 'john.doe@example.com',
            profilePicture: 'https://via.placeholder.com/150',
        });
    }, []);

    /**
     * Gère le changement de valeur des champs de saisie.
     * @param {React.ChangeEvent<HTMLInputElement>} e - L'événement de changement.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /**
     * Gère le changement de l'image de profil.
     * @param {React.ChangeEvent<HTMLInputElement>} e - L'événement de changement.
     */
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser((prevState) => ({
                ...prevState,
                profilePicture: reader.result || '',
            }));
        };
        reader.readAsDataURL(file);
    };

    /**
     * Gère la soumission du formulaire.
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pouvez envoyer les données à une API pour mettre à jour le profil de l'utilisateur
        console.log('User data to be submitted:', user);
    };

    return (
        <main>
            <div className='user-profile-wrapper'>
                <form className='user-form' onSubmit={handleSubmit}>
                    <h2>Bonjour, {user.name}</h2>
                    <div className="form-group">
                        <label htmlFor="profilePicture">Image de Profil</label>
                        <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
                        {user.profilePicture && (
                            <img src={user.profilePicture} alt="Profile" style={{ width: '10em', height: '10em', borderRadius: '50%' }} />
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                    </div>
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </main>
    );
}

