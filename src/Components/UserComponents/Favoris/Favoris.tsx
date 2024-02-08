import React from 'react';
import './Favoris.css';
import HeaderUser from '../HeaderUser/HeaderUser';

export default function Favoris({ spots }) {
  if (!spots || spots.length === 0) {
    return <div className="favorite-spots">Aucun spot en favoris.</div>;
  }

  return (
    <>
      <HeaderUser />
      <main>
        <div className="favorite-spots">
          <h2>Spots Favoris</h2>
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
    </>
  );
};

