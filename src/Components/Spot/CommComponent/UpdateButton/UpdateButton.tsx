import { useState } from 'react';
import './UpdateButton.css';
import axios from 'axios';

interface UpdateButtonProps {
    commentId: number;
    onCommentUpdated: (updatedComment: string, updatedRating: number) => void;
    onCommentContent: string;
    onCommentRating: number;
}

const API_BASE_URL = "http://ombelinepinoche-server.eddi.cloud:8443/api";

export default function UpdateButton({ commentId, onCommentUpdated, onCommentContent, onCommentRating }: UpdateButtonProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [editing, setEditing] = useState(false);
    const [newComment, setNewComment] = useState(onCommentContent);
    const [newRating, setNewRating] = useState(onCommentRating);

    /**
     * Handles the update of a comment.
     * 
     * @returns A promise that resolves when the comment is successfully updated.
     */
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                console.error('Token manquant');
                return;
            }
            await axios.put(`${API_BASE_URL}/secure/comment/${commentId}`, { content: newComment, rating: newRating }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onCommentUpdated(newComment, newRating);
            setEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error);
        }
    };

    if (editing) {
        return (
            <div className="editing-container">
                <textarea required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Modifier le commentaire..."
                />
                <select required
                    className="edit-notation"
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
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
                <button className="edit-buttons validate" onClick={handleUpdate}><img src="/check-regular-24-1.png"></img></button>
                <button className="edit-buttons cancel" onClick={() => setEditing(false)}><img src="/x-regular-24-2.png"></img></button>
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
                src={isHovering ? "/src/assets/images/edit-alt-solid-24.png" : "/src/assets/images/pencil-solid-24-1.png"}
                alt="Edit"
            ></img>
        </button>
    );
}
