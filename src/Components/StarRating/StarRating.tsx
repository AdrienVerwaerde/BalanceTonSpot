import { useState, useEffect } from 'react';
import './StarRating.css'; 

interface StarRatingProps {
    id: number;
    rating: number;
}

/**
 * Component for rendering a star rating based on a given rating value.
 *
 * @component
 * @param {StarRatingProps} props - The props for the StarRating component.
 * @param {number} props.rating - The rating value to display.
 * @returns {JSX.Element} The rendered StarRating component.
 */
export default function StarRating({rating} : StarRatingProps): JSX.Element{
    const [hover, setHover] = useState<number>(0);

    useEffect(() => {
        setHover(rating);
    }, [rating]);

    /**
     * Renders the individual star elements based on the rating value.
     *
     * @returns {JSX.Element[]} The array of star elements.
     */
    const renderStars = (): JSX.Element[] => {
        const stars: JSX.Element[] = [];
        for (let i = 5; i >= 1; i--) {
            const isFilled = i <= (hover || rating);
            const isPartialFilled = i <= Math.floor(rating) || (i === Math.ceil(rating) && rating % 1 > 0);
            let starContent: JSX.Element;

            if (isFilled) {
                starContent = <img src="/starfilled.svg" alt="Star" />;
            } else if (isPartialFilled) {
                starContent = <img src="/starhalf.svg" alt="Half Star" />;
            } else {
                starContent = <img src="/starempty.svg" alt="Empty Star" />;
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
}