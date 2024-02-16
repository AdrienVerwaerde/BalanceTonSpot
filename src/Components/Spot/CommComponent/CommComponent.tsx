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

export default function CommentSection({ spot }: SpotProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<User>({});
  const [open, setOpen] = useState(false);



  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async () => {
    const token = localStorage.getItem('userToken');
    // Vérification supplémentaire pour s'assurer que le token est non vide
    if (token && token.trim() !== '') {
      try {
        const response = await axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({ pseudo: response.data.pseudo });
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    } else {
      console.log('No token found or token is invalid');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (spot && spot.name) {
      const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
      axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}/comments`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error("Erreur lors du chargement des commentaires", error);
        });
    }
  }, [spot]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
  event.preventDefault();
    if (newComment.trim() !== '' && user.pseudo) {
      const commentToSubmit = {
        // Supposons que votre API attend un `id` pour le commentaire, cela devrait normalement être généré côté serveur
        content: newComment.trim(),
        username: user.pseudo, // Utilisation de `user.pseudo` au lieu de 'coucou'
        spot: [spot.id], // Supposons que l'API attend un tableau avec l'ID du spot
        date: new Date().toISOString(),
        rating: null // Utilisation de `null` si aucun rating n'est fourni
      };

      // Affichage des valeurs dans la console pour débogage
    console.log('Content:', commentToSubmit.content);
    console.log('Username:', commentToSubmit.username);
    console.log('Spot ID:', commentToSubmit.spot);
    console.log('Date:', commentToSubmit.date);
    console.log('Rating:', commentToSubmit.rating);
  
      try {
        const response = await axios.post('http://ombelinepinoche-server.eddi.cloud:8443/api/comments', commentToSubmit);
        console.log(response.data);
        setComments([...comments, response.data]);
        setNewComment('');
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
                <h2 id="comments-submit-title">Balance Ton Com' !</h2>
                <textarea 
                className="comments-text-input" 
                value={newComment}
                onChange={handleCommentChange} />
                <button className="comments-button-cancel" 
                type="submit" 
                onClick={handleClose}><img id="button-cancel-img" src="https://i.postimg.cc/ZRpy77dM/x-regular-24.png"/>ANNULER</button>
                <button 
                className="comments-button-submit" 
                type="submit"
                >ENVOYER<img id="button-submit-img" src="https://i.postimg.cc/QMxygx8Y/send-regular-24-1.png"/></button>
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