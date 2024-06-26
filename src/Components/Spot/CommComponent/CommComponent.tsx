import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import StarRating from "../../StarRating/StarRating";
import TrashButton from "./TrashButton/TrashButton";
import UpdateButton from "./UpdateButton/UpdateButton";
import "./CommComponent.css";

// Definition of the Comment interface
interface Comment {
  rating: number;
  id: number;
  text: string;
  username: string;
  spot: number;
  content: string;
  date: string;
  user: { pseudo: string; profilpicture: string };
}

// Definition of the Props interface
interface SpotProps {
  spot: {
    id: number;
    name: string;
  };
}

const FETCH_USER = "https://balancetonspotapi.live/uploads/";
const API_BASE_URL = "https://balancetonspotapi.live/api";

export default function CommentSection({ spot }: SpotProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState(5); // Base number of visible comments
  const [currentUserPseudo, setCurrentUserPseudo] = useState("");
  const token = localStorage.getItem("userToken");
  const location = useLocation();

  const handleCommentSubmit = async () => {
    // Verifies if the comment or notation wasn't submitted
    if (!newComment.trim() || rating === null) {
      setError("Vous devez écrire un commentaire et donner une note avant de soumettre.");
      return; // Leaves the function to prevent from submitting over and over again
    }

    // Prepares comment data for submission
    const commentToSubmit = {
      content: newComment.trim(),
      rating,
    };

    try {
      // Checks if there is a token
      if (!token) {
        console.error("Token d'autorisation manquant");
        setError("Vous devez être connecté pour poster un commentaire.");
        return; // Leaves the function if token is absent
      }

      // Makes POST request to submit the comment
      const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
      const response = await axios.post(
        `${API_BASE_URL}/spot/${formattedSpotName}/comments`,
        commentToSubmit,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Udates state to display the new comment
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");
      setRating(null);
      setOpen(false); // Closes the modal
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire", error);
      setError("Erreur lors de l'envoi du commentaire.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (spot && spot.name) {
        const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
        try {
          const response = await axios.get(
            `${API_BASE_URL}/spot/${formattedSpotName}/comments`
          );

          const sortedComments = response.data.slice().reverse();
          setComments(sortedComments);
        } catch (error) {
          console.error("Erreur lors du chargement des commentaires", error);
          setError("Erreur lors du chargement des commentaires.");
        }
      }
    };

    fetchComments();
  }, [spot]);

  /**
   * Function to display date in the desired format
   */
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRating(value === "" ? null : Number(value));
  };

  const handleOpen = () => {
    if (token) {
      setOpen(true);
    } else {
      setError("Vous devez être connecté pour poster un commentaire.");
    }
  };

  const handleClose = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setOpen(false);
    setNewComment("");
    setRating(null);
  };

  /**
   * Adds 5 more comments to display
   **/
  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  const removeCommentById = (commentId: number) => {
    setComments((currentComments) => currentComments.filter(comment => comment.id !== commentId));
  };

  async function fetchUserData() {
    if (!token) {
      console.error("Aucun token trouvé");
      return;
    }

    try {
      const response = await axios.get('http://ombelinepinoche-server.eddi.cloud:8443/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userName = response.data.pseudo;
      console.log("Nom d'utilisateur récupéré", userName)
      return userName;
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'utilisateur", error);
    }
  }

  useEffect(() => {
    // Calls the function when component is loading
    const fetchAndSetUserData = async () => {
      const userName = await fetchUserData();
      setCurrentUserPseudo(userName);
    };

    if (token) {
      fetchAndSetUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const updateCommentById = (commentId: number, updatedText: string, updatedRating: number) => {
    setComments(currentComments =>
        currentComments.map(comment =>
            comment.id === commentId ? { ...comment, content: updatedText, rating: updatedRating } : comment
        )
    );
};

  return (
    <div className="comments-container">
      {error && <p className="error-message">{error}</p>}

      <h2 id="comments-section-title">Les Avis des Riders</h2>
      {
        token ? (
          <Button id="button-modal-open" onClick={handleOpen}>
            COMMENTER ET NOTER
          </Button>
        ) : (
          <Link to="/login" state={{ from: location }}><Button id="button-modal-login">VEUILLEZ VOUS CONNECTER POUR COMMENTER ET NOTER</Button></Link>
        )
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="modal-box">
            <form className="comments-form" onSubmit={handleCommentSubmit}>
              {/* Comment */}
              <h2 id="comments-submit-title">Balance Ton Com' !</h2>
              <textarea required
                className="comments-text-input"
                value={newComment}
                onChange={handleCommentChange}
              />

              {/* Notation of the spot */}
              <div className="notation-container">
                <h3 id="notation-title">Balance Ta Note :</h3>
                <select required
                  className="notation"
                  value={rating === null ? "" : rating.toString()}
                  onChange={handleRatingChange}
                >
                  <option disabled value="">
                    --
                  </option>
                  {[...Array(6).keys()].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cancel & Submit*/}
              <button
                className="comments-button-cancel"
                type="submit"
                onClick={handleClose}
              >
                <img
                  id="button-cancel-img"
                  src="/x-regular-24-2.png"
                />
                ANNULER
              </button>
              <button className="comments-button-submit" type="submit">
                ENVOYER
                <img
                  id="button-submit-img"
                  src="/send-regular-24-1.png"
                />
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>

      {/* Comments display*/}
      <ul className="comments-list">
        {comments.slice(0, visibleComments).map((comment) => (
          <li key={comment.id}>
            <div className="comments-user-block">
              <img
                src={`${FETCH_USER}${comment.user?.profilpicture}`}
                alt={comment.user?.pseudo}
                className="user-image"
              />
              <h3>{comment.user?.pseudo}</h3>
            </div>
            <div className="comment-notation">
              <StarRating rating={comment.rating} id={0} />
            </div>
            <p>{comment.content}</p>
            <p id="comments-date">Posté le : {formatDate(comment.date)}</p>
            {currentUserPseudo === comment.user?.pseudo && (
              <div className="comments-options-container">
                <UpdateButton commentId={comment.id} onCommentContent={comment.content} onCommentRating={comment.rating} onCommentUpdated={(updatedComment, updatedRating) => updateCommentById(comment.id, updatedComment, updatedRating)} />
                <TrashButton commentId={comment.id} onCommentDeleted={() => removeCommentById(comment.id)} />
              </div>
            )}
          </li>
        ))}
      </ul>
      {comments.length > visibleComments && (
        <button className="comments-load-button" onClick={loadMoreComments}>Charger plus de commentaires</button>
      )}
    </div>
  );
}