import { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

export default function SignUpForm() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the form submission for user sign up.
     * 
     * @param e - The event object.
     */
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // First, proceeds to registering the user
            await axios.post('http://ombelinepinoche-server.eddi.cloud:8443/api/users', {
                pseudo,
                email,
                password,
                roles: ["ROLE_USER"] // Adds a default role to the user
            });
            // Makes a request to obtain a token
            const loginResponse = await axios.post('http://ombelinepinoche-server.eddi.cloud:8443/api/login_check', {
                username: email,
                password: password,
            });
            // Stocks the token in localStorage or sessionStorage
            localStorage.setItem('userToken', loginResponse.data.token);

            // Redirects to the profile page when signing up is successful 
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
