import { useState } from 'react';
import './TrashButton.css';
import axios from 'axios';
import Swal from 'sweetalert2';

interface TrashButtonProps {
  commentId: number;
  onCommentDeleted: () => void;
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function TrashButton({ commentId, onCommentDeleted }: TrashButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Handles the deletion of a comment after confirmation.
   * 
   * @returns A promise that resolves when the comment is successfully deleted.
   */
  const handleDelete = async (): Promise<void> => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          console.error('Token manquant');
          return;
        }
        await axios.delete(`${API_BASE_URL}/secure/comment/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Call the callback function after successful deletion
        onCommentDeleted();
        Swal.fire(
          'Supprimé!',
          'Votre commentaire a été supprimé.',
          'success'
        );
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
        Swal.fire(
          'Erreur!',
          'Une erreur est survenue lors de la suppression.',
          'error'
        );
      }
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
