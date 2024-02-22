import { useState } from 'react';
import './TrashButton.css';
import axios from 'axios';

interface TrashButtonProps {
  commentId: number;
  onCommentDeleted: () => void;
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function TrashButton ({ commentId, onCommentDeleted } : TrashButtonProps){
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Token manquant');
        return;
      }
      await axios.delete(`${API_BASE_URL}/secure/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Appel de la fonction de rappel après la suppression réussie
      onCommentDeleted();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  return (
    <button 
      className="trash-button" 
      onClick={handleDelete} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
      aria-label="Delete comment"
    >
      <img 
        src={isHovering ? "https://i.postimg.cc/SRH6fFgH/trash-solid-alt.png" : "https://i.postimg.cc/DyNN0K01/trash-solid-24.png"} 
        alt="Delete"
      ></img>
    </button>
  );
}
