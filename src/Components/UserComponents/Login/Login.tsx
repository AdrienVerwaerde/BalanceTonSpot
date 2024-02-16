import { useState, useEffect } from "react";
// Optional axios import, useful for real API calls.
// import axios from "axios";
// Import CSS styles for the login form.
import "./Login.css";
// For navigation and links within the app.
import { Link, useNavigate } from "react-router-dom";
// Import an icon for UI enhancement.
import { ImCross } from "react-icons/im";

// Mock database to simulate user authentication.
const fakeDB = {
    users: [
        {
            id: 1,
            email: "user@example.com",
            // Warning: Never store passwords as plain text in a real application.
            password: "password123",
            token: "fakeToken123456789",
        },
        // Add more users here to simulate a larger database.
    ],
};

// Function to simulate the authentication process.
const authenticateUser = async (email: string, password: string) => {
    // Search for a matching user in the mock database.
    const user = fakeDB.users.find(
        (user) => user.email === email && user.password === password
    );
    
    if (user) {
        // If found, return a success object with a token.
        return { success: true, token: user.token };
    } else {
        // Otherwise, throw an error indicating authentication failure.
        throw new Error("Invalid password and/or email.");
    }
};

export default function LoginForm() {
    // Local state to manage form inputs, loading state, and error messages.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook for programmatic navigation.

    useEffect(() => {
        // Check for a stored token on component mount.
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/"); // Redirect to home page if already logged in.
        }
    }, [navigate]);

    // Handle form submission.
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent page reload.
        setLoading(true); // Start loading indicator.

        try {
            // Attempt authentication with provided credentials.
            const response = await authenticateUser(email, password);
            localStorage.setItem("token", response.token); // Store token locally for the session.
            setLoading(false); // Stop loading indicator.
            navigate("/"); // Redirect to home page after successful login.
        } catch (error) {
            // Handle authentication errors.
            setError(error.message); // Display error message.
            setLoading(false); // Stop loading indicator.
        }
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