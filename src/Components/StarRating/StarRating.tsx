import React, { useState, useEffect } from 'react';
import './StarRating.css'; // Make sure to have the corresponding CSS file

interface StarRatingProps {
    id: number;
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({rating}) => {
    const [hover, setHover] = useState<number>(0);

    useEffect(() => {
        setHover(rating);
    }, [rating]);

    const renderStars = (): JSX.Element[] => {
        const stars: JSX.Element[] = [];
        for (let i = 5; i >= 1; i--) {
            const isFilled = i <= (hover || rating);
            const isPartialFilled = i <= Math.floor(rating) || (i === Math.ceil(rating) && rating % 1 > 0);
            const starClassName = `star ${isFilled ? 'filled' : ''}`;
            const starContent = isPartialFilled ? '★' : '☆';

            stars.unshift(
                <span
                    key={i}
                    className={starClassName}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(rating)}
                >
                    {starContent}
                </span>
            );
        }
        return stars;
    };

    const renderPartialStar = (): JSX.Element | null => {
        if (rating % 1 > 0) {
            const partialStarWidth = `${(rating % 1) * 20}%`;
            return (
                <span className="star partial-filled" style={{ width: partialStarWidth }}>
                    ★
                </span>
            );
        }
        return null;
    };

    return (
        <div className="star-rating">
            {renderStars()}
            {renderPartialStar()}
        </div>
    );
};

export default StarRating;


