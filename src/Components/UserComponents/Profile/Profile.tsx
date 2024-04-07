import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Swal from "sweetalert2";

const API_BASE_URL = "https://balancetonspotapi.live/api";
const FETCH_PICTURES = "https://balancetonspotapi.live/uploads/";

/**
 * Component for the user profile dashboard.
 */
export default function UserProfileDashboard() {
    const [user, setUser] = useState({
        pseudo: "",
        email: "",
        firstname: "",
        lastname: "",
        profilPicture: "",
    });

    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("userToken");

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Fetches user data from the server.
     */
    const fetchUserData = async () => {
        if (token && token.trim() !== "") {
            try {
                const response = await axios.get(`${API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser({
                    pseudo: response.data.pseudo,
                    email: response.data.email,
                    firstname: response.data.firstname || "",
                    lastname: response.data.lastname || "",
                    profilPicture: response.data.profilpicture,
                });
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        } else {
            console.log("No token found or token is invalid");
        }
    };

    /**
     * Handles form input changes.
     * @param e - The event object.
     */
    const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name as string]: value,
        }));
    };

    /**
     * Handles profile picture change.
     * @param e - The event object.
     */
    const handleProfilePictureChange: React.ChangeEventHandler<
        HTMLInputElement
    > = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setIsLoading(true); // Activates loading indicator
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    // Instantly updates and displays image
                    setProfilePictureUrl(reader.result);
                    uploadProfilePicture(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilePicture = async (file: string | Blob) => {
        setIsLoading(true); // Activates loading indicator

        const formData = new FormData();
        formData.append("profilPictureFile", file);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/profile/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const newImageUrl = response.data.url;

            // Pre-load image in background
            const img = new Image();
            img.onload = () => {
                // Once the picture is loaded, updates profile picture URL and disables loading
                setProfilePictureUrl(newImageUrl); // Updates state with image final URL
                setIsLoading(false); // Disable loading indicator
            };
            img.onerror = () => {
                // Manages error if the picture doesn't load
                setIsLoading(false); 
                console.error("Failed to load the updated profile picture.");
            };
            img.src = newImageUrl;
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        // Using useEffect to update image URL with a timestamp
        if (user.profilPicture) {
            const newProfilePictureUrl = `${FETCH_PICTURES}${user.profilPicture
                }?timestamp=${new Date().getTime()}`;
            setProfilePictureUrl(newProfilePictureUrl);
        }
    }, [user.profilPicture]);

    /**
     * Handles form submission.
     * @param e - The event object.
     */
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const formData = new FormData();
                formData.append("pseudo", user.pseudo);
                formData.append("email", user.email);
                formData.append("firstname", user.firstname);
                formData.append("lastname", user.lastname);

                await axios.put(`${API_BASE_URL}/user`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Pop-up alert component
                Swal.fire({
                    title: "Profil mis à jour",
                    text: "Tout beau, tout propre !",
                    icon: "success",
                    color: "#000000",
                    background: "#ffffff",
                    backdrop: `#e3e3e36z`,
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    scrollbarPadding: false,
                });
            } catch (error) {
                console.error("Error updating profile", error);
                // Pop-up alert component
                Swal.fire({
                    title: "Erreur",
                    text: "Veuillez réessayer plus tard. (phrase bateau... je sais)",
                    icon: "error",
                    color: "#000000",
                    background: "#ffffff",
                    backdrop: `#e3e3e36z`,
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    scrollbarPadding: false,
                });
            }
        }
    };

    return (
        <main>
            <div className="user-profile-wrapper">
                <form className="user-form" onSubmit={handleSubmit}>
                    <h2>Bonjour, {user.pseudo}</h2>
                    <div className="form-group">
                        <label htmlFor="profilePicture">Image de Profil</label>
                        <div className="profile-picture-container">
                            {isLoading ? (
                                <div className="loader-container">
                                    <img
                                        src="/bouton-skate-color-2.png"
                                        alt="loader"
                                        className="loader-img"
                                    />
                                    <p id="loader-message">Chargement en cours...</p>
                                </div>
                            ) : (
                                <img
                                    className="profile-dashboard-img"
                                    src={profilePictureUrl}
                                    alt="Profil"
                                    style={{ width: "10em", height: "10em", borderRadius: "50%" }}
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            id="profilPicture"
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pseudo">Nom affiché</label>
                        <input
                            type="text"
                            id="pseudo"
                            name="pseudo"
                            value={user.pseudo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom de famille</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </main>
    );
}
