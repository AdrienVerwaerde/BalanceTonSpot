import { useState, useEffect } from 'react';
import './Profile.css';

const defaultProfilePicture = 'https://i.postimg.cc/0jKQyGYc/default-profile.png';

export default function UserProfileDashboard() {
    const [user, setUser] = useState({
        pseudo: '',
        email: '',
        profilePicture: '',
    });

    useEffect(() => {
        setUser({
            pseudo: '{pseudo}',
            email: '{email}',
            profilePicture: '{profilePicture}',
        });
    }, []);

    const handleChange = (e: { target: { pseudo: any; value: any; }; }) => {
        const { pseudo, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [pseudo]: value,
        }));
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                // Utilisez as string pour s'assurer que le type est correct
                setUser((prevState) => ({
                    ...prevState,
                    profilePicture: reader.result as string || '',
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('User data to be submitted:', user);
        // Envoie des données à une API pour mise à jour
    };

    return (
        <main>
            <div className='user-profile-wrapper'>
                <form className='user-form' onSubmit={handleSubmit}>
                    <h2>Bonjour, {user.pseudo}</h2>
                    <div className="form-group">
                    <label htmlFor="profilePicture">Image de Profil</label>
                    {user.profilePicture && (
                            <img className="profile-dashboard-img" src={user.profilePicture || defaultProfilePicture} alt="Profile" style={{ width: '10em', height: '10em', borderRadius: '50%' }} />
                        )}
                        
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
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </main>
    );
}
