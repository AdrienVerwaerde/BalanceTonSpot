import React, { useState, useEffect } from 'react';
import './CommComponent.css'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import StarRating from '../../StarRating/StarRating';

// Définition de l'interface pour le commentaire
interface Comment {
  rating: number;
  id: number;
  text: string;
  username: string;
  spot: number;
  content: string;
  date: string;
  user: { pseudo: string, profilpicture: string };
}

// Définition de l'interface pour les props
interface SpotProps {
  spot: {
    id: number;
    name: string;
  };
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function CommentSection({ spot }: SpotProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (spot && spot.name) {
        const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
        try {
          const response = await axios.get(`${API_BASE_URL}/spot/${formattedSpotName}/comments`);
          setComments(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des commentaires", error);
          setError("Erreur lors du chargement des commentaires.");
        }
      }
    };

    fetchComments();
  }, [spot]);

  // Fonction pour formater la date
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRating(value === "" ? null : Number(value));
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() !== '' && rating !== null) {
      const commentToSubmit = {
        content: newComment.trim(),
        rating,
      };
  
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          console.error("Token d'autorisation manquant");
          return; // Stoppe l'exécution si le token est manquant
        }
        const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
        const response = await axios.post(`${API_BASE_URL}/spot/${formattedSpotName}/comments`, commentToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setComments(prevComments => [...prevComments, { ...response.data, user: { pseudo: "Anonymous", profilpicture: "" } }]); // Adaptation temporaire
        setNewComment('');
        setRating(null);
        setOpen(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire", error);
        setError("Erreur lors de l'envoi du commentaire.");
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewComment('');
    setRating(null); // Assurez-vous de réinitialiser également la note
  };

  return (
    <div className="comments-container">
      {error && <p className="error-message">{error}</p>}

      <h2 id="comments-section-title">Les Avis des Riders</h2>
      <Button id="button-modal-open" onClick={handleOpen}>COMMENTER ET NOTER</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box className="modal-box">
            <form className="comments-form" onSubmit={handleCommentSubmit}>
              <h2 id="comments-submit-title">Balance Ton Com' !</h2>
              <textarea
                className="comments-text-input"
                value={newComment}
                onChange={handleCommentChange} />

              <h3 id="notation-title">Balance Ta Note:</h3>
              <select className="notation" value={rating === null ? "" : rating.toString()} onChange={handleRatingChange}>
                <option disabled value="">--</option>
                {[...Array(6).keys()].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <div className="form-actions">
                <Button className="comments-button-cancel" onClick={handleClose}>ANNULER</Button>
                <Button className="comments-button-submit" type="submit">ENVOYER</Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      <ul className="comments-list">
        {comments.map(( comment ) => (
          <li key={comment.id}>
            <div className="comments-user-block">
            <img src={comment.user.profilpicture} alt={comment.user.pseudo} className="user-image" />
            <h3>{comment.user.pseudo}</h3>
            </div>
            <div className="comment-notation">
            <StarRating rating={comment.rating} id={0} />
            </div>
            <p>{comment.content}</p>
            <p>Posté le : {formatDate(comment.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
