import { useState } from 'react';
import axios from 'axios';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import HeaderUser from '../HeaderUser/HeaderUser';


export default function SignUpForm() {
    // 1. Create a state for email, password and password confirmation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // 2. Create a state for error
    const [error, setError] = useState('');
    // 3. Create a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //     const authObject = {'User-Name': username, 'User-Secret': password};

        //     try {
        //         await axios.get('https://api.chatengine.io/chats', { headers: authObject });

        //         localStorage.setItem('username', username);
        //         localStorage.setItem('password', password);

        //         window.location.reload();
        //         setError('');
        //     } catch (err) {
        //         setError('Oops, wrong username or password.');

        
        //     }

        // Check if password and password-confirmation match
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return; // Exit early if passwords don't match
        }

        // If passwords match, validate form submission
        setError('');
    };

    return (
        <div className="wrapper-signup">
            
            <div className="form-container">
                <img src="https://i.goopics.net/qwh4qx.png" className="title-signup" />
                <h1>S'inscrire pour la Ride !</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-signup" placeholder="E-mail" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-signup" placeholder="Mot de Passe" required />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-signup" placeholder="Confirmer mot de passe" required />
                    <div align="center">
                        <button type="submit" className="button-signup">
                            <span>INSCRIPTION</span>
                        </button>
                        <Link to="/"><button className="close-button-signup"><ImCross />Retour à l'Accueil</button></Link>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};