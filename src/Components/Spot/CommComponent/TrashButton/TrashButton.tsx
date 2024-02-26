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
      title: 'Supprimer le commentaire',
      text: "Es-tu sûr.e ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
      buttonsStyling: false,
      scrollbarPadding: false
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
        Swal.fire({
          title: 'Commentaire supprimé',
          text: "On ne le reverra pas de sitôt !",
          icon: 'success',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          scrollbarPadding: false
      });
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur s'est produite",
          icon: 'error',
          confirmButtonText: 'OK',
          buttonsStyling: false,
          scrollbarPadding: false
      });
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
        src={isHovering ? "/src/assets/images/trash-solid-alt.png" : "/src/assets/images/trash-solid-24.png"}
        alt="Delete"
      ></img>
    </button>
  );
}
