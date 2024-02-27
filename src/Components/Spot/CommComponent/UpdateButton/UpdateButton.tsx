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
    // State variables to manage component state
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
            // Retrieves the user token from local storage
            const token = localStorage.getItem('userToken');
            // Checks if token exists
            if (!token) {
                console.error('Missing token');
                return;
            }
            // Sends a PUT request to update the comment
            await axios.put(`${API_BASE_URL}/secure/comment/${commentId}`, { content: newComment, rating: newRating }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Calls the onCommentUpdated function with the updated comment and rating
            onCommentUpdated(newComment, newRating);
            // Resets the editing state to false
            setEditing(false);
        } catch (error) {
            // Log error if updating the comment fails
            console.error('Error updating comment', error);
        }
    };

    // Renders editing UI if editing state is true
    if (editing) {
        return (
            <div className="editing-container">
                {/* Textarea to edit the comment */}
                <textarea required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Edit comment..."
                />
                {/* Dropdown to select the rating */}
                <select required
                    className="edit-notation"
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                >
                    <option disabled value="">
                        --
                    </option>
                    {/* Create options for ratings */}
                    {[...Array(6).keys()].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
                {/* Button to validate the update */}
                <button className="edit-buttons validate" onClick={handleUpdate}><img src="/check-regular-24-1.png" alt="Validate" /></button>
                {/* Button to cancel editing */}
                <button className="edit-buttons cancel" onClick={() => setEditing(false)}><img src="/x-regular-24-2.png" alt="Cancel" /></button>
            </div>
        );
    }

    // Renders update button if editing state is false
    return (
        <button
            className="update-button"
            onClick={() => setEditing(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Update comment"
        >
            {/* Renders edit icon based on hover state */}
            <img
                src={isHovering ? "/edit-alt-solid-24.png" : "/pencil-solid-24-1.png"}
                alt="Edit"
            />
        </button>
    );
}
