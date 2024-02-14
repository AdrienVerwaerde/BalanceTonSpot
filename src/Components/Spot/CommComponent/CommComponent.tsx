import React, { useState } from 'react';
import './CommComponent.css'

interface Comment {
    id: number;
    text: string;
}

export default function CommentSection({ spot }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
            const comment: Comment = {
                id: Date.now(),
                text: newComment.trim(),
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    const spots = [
        {
            name: "SuperRider69",
            description:
                "Au top le spot mais j'étais bourré j'ai shooté un gosse",
            image:
                "https://cdn-s-www.ledauphine.com/images/0B4C75D1-BE1B-47ED-9CDF-B171D74277BD/NW_raw/le-snowpark-de-vars-s-etale-sur-plus-de-1-000-metres-de-denivele-c-est-ce-qui-fait-sa-singularite-et-sa-notoriete-qui-depassent-aujourd-hui-les-frontieres-europeennes-1390340766.jpg",
        },
        {
            name: "gros-ouf-de-la-street",
            description:
                "Ouais euh bon euuuh ça manque d'un robinet quand même s'hydrater c'est important mais quand on oublie sa bouteille on fait quoi...",
            image:
                "https://static.savoie-mont-blanc.com/wp-content/uploads/external/e132d5d4d725e4a69beabf7bcc818ecf-3800129-1745x1163.jpg",
        },
        {
            name: "jean-claude marlaux",
            description:
                "Quel est ce site ? Ce n'est pas Facebook ? Où sont mes articles conspirationistes et mes images générées par IA que je pense que c'est des vraies ??",
            image:
                "https://www.laclusaz.com/app/uploads/apidae/7138618-diaporama-890x500.jpg",
        },
    ];

    return (
        <div className="comments-container">
            <h2>Les Avis des Riders</h2>
            <form className="comments-form" onSubmit={handleCommentSubmit}>
                <input type="text" value={newComment} onChange={handleCommentChange} />
                <button className="comments-button" type="submit">Add Comment</button>
            </form>
            <ul className="comments-list">
                {spots.map((spot) => (
                    <li key={spot.id}>
                        <img src={spot.image} alt={spot.name} className="user-image" />
                        <h3>{spot.name}</h3>
                        <p>{spot.description}</p>
                        <p>date</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
