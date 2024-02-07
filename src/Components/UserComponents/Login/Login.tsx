import { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { Link } from 'react-router-dom';

export default function LoginForm() {

// 1. Create a state for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    };

    return (
        <div className="wrapper-login">
            <div className="form-login">
                <img src="https://i.goopics.net/qwh4qx.png" className="title-login" />
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-login" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-login" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button-login">
                            <span>LOGIN</span>
                        </button>
                    </div>
                </form>
                <Link to="/SignUp">Pas de compte ? Rejoindre la communauté !</Link>
                <h1>{error}</h1>
            </div>
        </div>
    );
};