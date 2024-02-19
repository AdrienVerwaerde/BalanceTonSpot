import React, { useEffect, useState } from 'react';
import './404.css';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

export default function NotFoundPage() {

  const images = [
    {
      url: 'https://i.postimg.cc/fLB8q3rk/pun1.png',
      title: 'Quatre cents "4".',
    },
    {
      url: 'https://i.postimg.cc/j2rtdFhG/pun2.png',
      title: 'Quatre cents "cats".',
    },
    {
      url: 'https://i.postimg.cc/wvdRSHrN/pun3.png',
      title: 'Vroum.',
    },
    {
      url: 'https://i.postimg.cc/x8182d3X/pun4.png',
      title: "Quatre s'encastre.",
    },
    {
      url: 'https://i.postimg.cc/DytC8443/pun5.png',
      title: "Kit sans Kat.",
    },
    {
      url: 'https://i.postimg.cc/9QvfM799/pun6.png',
      title: "Carte sans Castres.",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(randomIndex);
}, []);

  const nextImage = () => {
    const nextIndex = (currentImage + 1) % images.length;
    setCurrentImage(nextIndex);
  };

  return (
    <div className="page-container">
      <div className="not-found-page">
        <img src={images[currentImage].url} alt={images[currentImage].title} />
        <h2>{images[currentImage].title}</h2>
        <button className="error-404-button" onClick={nextImage}>Autre Variante de "404" Hilarante </button>
        <Link to="/"><button className="close-button-404"><ImCross />Retour à l'Accueil</button></Link>
      </div>
    </div>
  );
};