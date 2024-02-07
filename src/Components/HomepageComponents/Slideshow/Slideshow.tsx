import React from 'react'
import './Slideshow.css'

const picture = ["https://cdn-s-www.ledauphine.com/images/0B4C75D1-BE1B-47ED-9CDF-B171D74277BD/NW_raw/le-snowpark-de-vars-s-etale-sur-plus-de-1-000-metres-de-denivele-c-est-ce-qui-fait-sa-singularite-et-sa-notoriete-qui-depassent-aujourd-hui-les-frontieres-europeennes-1390340766.jpg", "https://static.savoie-mont-blanc.com/wp-content/uploads/external/e132d5d4d725e4a69beabf7bcc818ecf-3800129-1745x1163.jpg", "https://www.laclusaz.com/app/uploads/apidae/7138618-diaporama-890x500.jpg"];

const textSpotlight = ["Le Vars Park est certainement le meilleur snowpark de France mais bon, je suis pas objectif, c'est là que j'ai mes meilleurs souvenirs de snowboard", "Alors ce park là j'y suis jamais allé mais comme il y'a un skieur sur la photo j'imagine que c'est un spot de seconde zone mal fréquenté !", "La Clusaz, la Clusaz... on en entend beaucoup parler mais bon, c'est une station de riches ! Révolution populaire !!"];

const delay = 4000;

export default function Slideshow() {
  //useState SlideShow
  const [index, setIndex] = React.useState(0);
  //useRef SlideShow
  const timeoutRef = React.useRef(null);

//! resetTimeout
  //resetTimeout function for SlideShow
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  //useEffect SlideShow for the timeout
  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === picture.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  //We create functions handleMouseEnter and handleMouseLeave that allow us to stop the carrousel when the mouse hovers it
  function handleMouseEnter() {
    resetTimeout();
  }

  function handleMouseLeave() {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === picture.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
  }

  return (
    //! Slideshow
    //The div slideshow with the class slideshow who got the slideshowSlider with the transform translate3d and the slideshowDots
    <div className="slideshow"  onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>

      {/*
      The div slideshowSlider who got the img src with the picture
      the style transform translate3d with the index * 100% and 0, 0
      */}

      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >

    {/* 
    picture.map can do a dynamic transition
     */}

        {picture.map((p, index) => (
          <div
            className="slide"
            key={index}
          >
            <a href="#"><div id="spotlight">
            <h2>SPOTLIGHT N°{index + 1}</h2>
            <text id="spotlight-text">{textSpotlight[index]}</text>
            <p>Découvrir</p>
            </div>
            </a>
            <img id="slideshow-img" src={p} alt="" />
          </div>
        ))}
      </div>

      {/*
      The div for the dots with the map function to create the dots.
      The div has the class slideshowDot and the key index
      */} 

      <div className="slideshowDots">
        {picture.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}


