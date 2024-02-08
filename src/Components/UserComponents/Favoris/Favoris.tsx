import React from 'react';
import './Favoris.css';

/**
 * Component for displaying favorite spots.
 * @param {Array} spots - The array of favorite spots.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Favoris({ spots }) {
  // Check if there are no spots or if the spots array is empty
  if (!spots || spots.length === 0) {
    // Render a message indicating that there are no favorite spots
    return <div className="favorite-spots">Aucun spot en favoris.</div>;
  }

  // Render the list of favorite spots
  return (
    <main>
      <div className="favorite-spots">
        <h2>BALANCE MES FAVORIS</h2>
        <ul>
          {spots.map((spot, index) => (
            <li key={index} className="spot-item">
              <img src={spot.image} alt={spot.name} className="spot-image" />
              <div className="spot-info">
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

