import React from 'react'
import './Slideshow.css'

const picture = ["https://cdn-s-www.ledauphine.com/images/0B4C75D1-BE1B-47ED-9CDF-B171D74277BD/NW_raw/le-snowpark-de-vars-s-etale-sur-plus-de-1-000-metres-de-denivele-c-est-ce-qui-fait-sa-singularite-et-sa-notoriete-qui-depassent-aujourd-hui-les-frontieres-europeennes-1390340766.jpg", "https://static.savoie-mont-blanc.com/wp-content/uploads/external/e132d5d4d725e4a69beabf7bcc818ecf-3800129-1745x1163.jpg", "https://www.laclusaz.com/app/uploads/apidae/7138618-diaporama-890x500.jpg"];
const delay = 5000;

export default function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

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

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {picture.map((p, index) => (
          <div
            className="slide"
            key={index}
          >
            <img src={p} alt="" />
          </div>
        ))}
      </div>

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


