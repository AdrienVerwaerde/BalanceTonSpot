import { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ImCross } from 'react-icons/im';

export default function SignUpForm() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Call useNavigate to get the navigation function

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // Ici, on suppose que l'inscription ne renvoie pas directement un token.
            // Donc, on procède d'abord à l'inscription
            await axios.post('http://ombelinepinoche-server.eddi.cloud:8443/api/users', {
                pseudo,
                email,
                password,
                roles: ["ROLE_USER"] // Ajoutez une valeur par défaut ou initialisez la variable de rôle
            });
            // Ensuite, effectuez une demande de connexion pour obtenir le token
            const loginResponse = await axios.post('http://ombelinepinoche-server.eddi.cloud:8443/api/login_check', {
                username: email,
                password: password,
            });
            // Stockez le token dans localStorage ou sessionStorage
            localStorage.setItem('userToken', loginResponse.data.token);

            // Redirection vers la page de profil après l'inscription réussie
            navigate('/');
        } catch (error: any) {
            console.log(pseudo, email, password);
            setError(error.response?.data.message || 'Une erreur est survenue lors de l\'inscription ou de la connexion.');
        }
    };

    return (
        <div className="wrapper-signup">
            <div className="form-container">
                <img src="https://i.postimg.cc/0QHzDXTz/logo-bts-simplified-transparent-copie.png" className="title-signup" />
                <h1>S'inscrire pour la Ride !</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="input-signup" placeholder="Nom affiché" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-signup" placeholder="E-mail" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-signup" placeholder="Mot de Passe" required />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-signup" placeholder="Confirmer mot de passe" required />
                    {error && (<p className="error-message">{error}</p>)}
                    <div>
                        <button type="submit" className="button-signup"><span>INSCRIPTION</span></button>
                        <Link to="/"><button className="close-button-signup"><ImCross />Retour à l'Accueil</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
