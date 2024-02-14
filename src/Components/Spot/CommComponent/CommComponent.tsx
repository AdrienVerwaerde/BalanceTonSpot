import React, { useState, useEffect } from 'react';
import './CommComponent.css'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

interface Comment {
    id: number;
    text: string;
}

export default function CommentSection({ spot }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (spot?.name) {
            // Formate le nom du spot pour l'URL
            const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
            axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}/comments`)
                .then(response => {
                    // Supposons que l'API renvoie un tableau de commentaires
                    setComments(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors du chargement des commentaires", error);
                });
        }
    }, [spot?.name]); // Déclenchez l'effet lorsque le nom du spot change

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
            const comment: Comment = {
                id: Date.now(), // Simulez un ID; dans une application réelle, l'API devrait générer l'ID
                text: newComment.trim(),
            };
            // Ici, vous pourriez vouloir envoyer le nouveau commentaire à l'API aussi
            setComments([...comments, comment]);
            setNewComment('');
        }
    };


    return (
        <div className="comments-container">
            <h2 id="comments-section-title">Les Avis des Riders</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Écrire un commentaire</Accordion.Header>
                    <Accordion.Body>
                        <form className="comments-form" onSubmit={handleCommentSubmit}>
                            <input className="comments-text-input" type="text" value={newComment} onChange={handleCommentChange} />
                            <button className="comments-button" type="submit">Ajouter Commentaire</button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

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
