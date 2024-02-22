import { useState } from 'react';
import './UpdateButton.css';
import axios from 'axios';

interface UpdateButtonProps {
    commentId: number;
    onCommentUpdated: (updatedComment: string) => void; 
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function UpdateButton({ commentId, onCommentUpdated }: UpdateButtonProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [editing, setEditing] = useState(false); 
    const [newComment, setNewComment] = useState('');

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                console.error('Token manquant');
                return;
            }
            await axios.put(`${API_BASE_URL}/secure/comment/${commentId}`, { text: newComment }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onCommentUpdated(newComment);
            setEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error);
        }
    };

    if (editing) {
        return (
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Modifier le commentaire..."
                />
                <button onClick={handleUpdate}>Mettre à jour</button>
                <button onClick={() => setEditing(false)}>Annuler</button>
            </div>
        );
    }

    return (
        <button
            className="update-button"
            onClick={() => setEditing(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Update comment"
        >
            <img
                src={isHovering ? "https://i.postimg.cc/NfqLyztF/edit-alt-solid-24.png" : "https://i.postimg.cc/K8hbv4KV/pencil-solid-24-1.png"}
                alt="Edit"
            ></img>
        </button>
    );
}
