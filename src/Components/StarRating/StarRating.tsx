import React, { useState, useEffect } from 'react';
import './StarRating.css'; 
import starFilledSvg from '../../assets/images/svg/starfilled.svg';
import starEmptySvg from '../../assets/images/svg/starempty.svg';
import starHalfSvg from '../../assets/images/svg/starhalf.svg';

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
            let starContent: JSX.Element;

        if (isFilled) {
            starContent = <img src={starFilledSvg} alt="Star" />;
        } else if (isPartialFilled) {
            starContent = <img src={starHalfSvg} alt="Half Star" />;
        } else {
            starContent = <img src={starEmptySvg} alt="Empty Star" />;
        }

            stars.unshift(
                <span
                    key={i}
                    className={`star ${isFilled ? 'filled' : ''}`}
                >
                    {starContent}
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="star-rating">
            {renderStars()}
        </div>
    );
};

export default StarRating;