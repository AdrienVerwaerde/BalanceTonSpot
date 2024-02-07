import React, { useState, useRef, useEffect } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import Fade from 'react-bootstrap/Fade';
import './ProfileButton.css'

export default function ProfileButton() {
  //This function uses useState to toggle the list of options from the button
  const [open, setOpen] = useState(false);
  //This function will make the menu close when we click outside of it
  const menuRef = useRef<HTMLDivElement>(null);
  //This function will check if the menu is already active
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Adds an event listener on the whole document to detect when we click anywhere but on the button and also allows to close the menu by clicking the button again
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='profile-btn-container'>
      <button 
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="shadow-none btn btn-primary btn-profile mb-5">
              <img id="button-img" src="https://i.goopics.net/n3a13g.png" alt="Profile button"></img>
              </button>
      <div ref={menuRef} style={{ minHeight: '150px' }}>
        <Fade in={open}>
      <ul className="list-group">
      <a href="#"><li className="list-group-item">PROFIL</li></a>
      <a href="#"><li className="list-group-item">FAVORIS</li></a>
      <a href="#"><li className="list-group-item">DECONNEXION</li></a>
    </ul>
        </Fade>
    </div>
    </div>
  )
}

