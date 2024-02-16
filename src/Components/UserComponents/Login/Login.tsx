import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        if (userToken) {
            navigate("/");
        }
    }, [navigate]);

    const authenticateUser = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://ombelinepinoche-server.eddi.cloud:8443/api/login_check", {
                username: email,
                password: password,
            });
            if (response.data && response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                navigate("/");
            } else {
                throw new Error("Réponse de l'API invalide, token manquant.");
            }
        } catch (error) {
            setError(error.response?.data.message || "Erreur lors de l'authentification.");
        } finally {
            setLoading(false); // Arrête l'indicateur de chargement quelle que soit l'issue de la tentative
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authenticateUser();
    };

    // JSX structure for the login form.
    return (
        <div className="wrapper-login">
            <div className="form-login">
                <img
                    src="https://i.postimg.cc/0QHzDXTz/logo-bts-simplified-transparent-copie.png"
                    alt="Logo"
                    className="title-login"
                />
                <h1>Se Connecter</h1>
                <form onSubmit={handleSubmit}>

                    {/* Email input field. */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-login"
                        placeholder="E-mail"
                        required
                    />

                    {/* Password input field. */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-login"
                        placeholder="Password"
                        required
                    />

                    {/* Form submission button. */}
                    <div>   
                        <button type="submit" className="button-login" disabled={loading}>
                            <span>{loading ? "Chargement..." : "Connexion"}</span>
                        </button>
                    </div>

                    {/* Links for signing up or returning to home page. */}
                    <Link to="/SignUp" className="signup-link">
                            Pas de compte ? Rejoindre la communauté !
                    </Link>
                    <Link to="/">
                        <button className="close-button-signup">
                            <ImCross />
                            Retour à l'accueil
                        </button>
                    </Link>
                </form>
                {error && <h1 className="error-message">{error}</h1>}
            </div>
        </div>
    );
}