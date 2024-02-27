import { useState, useContext } from "react";
import "./SpotsList.css";
import SearchContext from "../../contextAPI/searchContext.ts";
import SpotCard from "./SpotCard/SpotCard.tsx";

interface Spot {
    rating: number;
    id: number;
    name: string;
    description: string;
    picture: string;
    address: string;
    sport_id: [{ name: string }];
}

/**
 * Component that renders a list of spots.
 */
export default function SpotsList() {

    const [tri, setTri] = useState({ triPar: 'alphabet', order: 'asc' });

    /**
     * Gets the current page
     */
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Context variable to access the spots data.
     */
    const { spots } = useContext(SearchContext) || {};

    /**
     * Sorts spots based on the selected criteria.
     */
    const triSpots = () => {

        /**
         * Defining the number of spots per page
         */
        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20;
        return [...spots].sort((a, b) => {
            // Tri par alphabet
            if (tri.triPar === 'alphabet') {
                return tri.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            // Sorting by notation
            else if (tri.triPar === 'rating') {
                return tri.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
        }).slice(startIndex, endIndex);
    };

    /**
     * Handles changing the current page.
     * @param {number} page - The page number to navigate to.
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="filter-boxes-container">
                <select id="filter-box" value={tri.triPar} onChange={(e) => setTri({ ...tri, triPar: e.target.value })}>
                    <option value="alphabet">A à Z</option>
                    <option value="rating">Par Note</option>

                </select>
                <select id="filter-box" value={tri.order} onChange={(e) => setTri({ ...tri, order: e.target.value })}>
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
                </select>
            </div>

            <div id="spotslist-container">
                {/* CARD SPOT */}
                {triSpots().map((spot: Spot) => (
                    <SpotCard key={spot.id} spot={spot} onFavoriteToggle={function (): void {
                        throw new Error("Function not implemented.");
                    }} />
                ))}
            </div>

            {/* Pagination */}
            {spots.length > 20 && (
                <div className="pagination">
                    {Array(Math.ceil(spots.length / 20)).fill(null).map((_, i) => (
                        <button 
                            key={i + 1} 
                            onClick={() => handlePageChange(i + 1)} 
                            className={currentPage === i + 1 ? "pagination-button active" : "pagination-button"}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
