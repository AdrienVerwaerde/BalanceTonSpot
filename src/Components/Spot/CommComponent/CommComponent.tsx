import React, { useState, useEffect } from 'react';
import './CommComponent.css'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

// Définition de l'interface pour le commentaire
interface Comment {
  id: number;
  text: string;
  username: string;
  spot: number;
  content: string;
  picture: string;
  date: string;
}

// Définition de l'interface pour les props
interface SpotProps {
  spot: {
    id: number;
    name: string;
  };
}

// Définition de l'interface pour l'utilisateur
interface User {
  pseudo?: string;
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";
const USER_ENDPOINT = `${API_BASE_URL}/user`;
const COMMENTS_ENDPOINT = `${API_BASE_URL}/comments`;

export default function CommentSection({ spot }: SpotProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<User>({});
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const response = await axios.get(USER_ENDPOINT, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ pseudo: response.data.pseudo });
        } catch (error) {
          console.error('Error fetching user data', error);
          setError("Erreur lors de la récupération des données utilisateur.");
        }
      }
    };

    fetchUserData();
  }, []);

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

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRating(value === "" ? null : Number(value));
  };

  const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newComment.trim() !== '' && user.pseudo) {
      const commentToSubmit = {
        content: newComment.trim(),
        username: user.pseudo,
        spot: spot.name,
        date: new Date().toISOString(),
        rating: rating || null,
      };

      // Affichage des valeurs dans la console pour débogage
      console.log('Content:', commentToSubmit.content);
      console.log('Username:', commentToSubmit.username);
      console.log('Spot ID:', commentToSubmit.spot);
      console.log('Date:', commentToSubmit.date);
      console.log('Rating:', commentToSubmit.rating);

      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${COMMENTS_ENDPOINT}`, commentToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setComments(prevComments => [...prevComments, response.data]);
        setNewComment('');
        setRating(null);
        setOpen(false);
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire", error);
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewComment('');
  };

  return (
    <div className="comments-container">
      {error && <p className="error-message">{error}</p>}

      <h2 id="comments-section-title">Les Avis des Riders</h2>
      <div className="modal-container">
        <Button id="button-modal-open" onClick={handleOpen}>COMMENTER ET NOTER</Button>
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
              <form
                className="comments-form"
                onSubmit={handleCommentSubmit}>

                {/* Comment */}
                <h2 id="comments-submit-title">Balance Ton Com' !</h2>
                <textarea
                  className="comments-text-input"
                  value={newComment}
                  onChange={handleCommentChange} />

                {/* Notation of the spot */}
                <h3 id="notation-title">Balance Ta Note (facultatif) :</h3>
                <select className="notation" value={rating === null ? "" : rating.toString()} onChange={handleRatingChange}>
                  <option value=""></option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                {/* Cancel & Submit*/}
                <button className="comments-button-cancel"
                  type="submit"
                  onClick={handleClose}><img id="button-cancel-img" src="https://i.postimg.cc/ZRpy77dM/x-regular-24.png" />ANNULER</button>
                <button
                  className="comments-button-submit"
                  type="submit"
                >ENVOYER<img id="button-submit-img" src="https://i.postimg.cc/QMxygx8Y/send-regular-24-1.png" /></button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <img src={comment.picture} alt={comment.username} className="user-image" />
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            <p>{comment.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};