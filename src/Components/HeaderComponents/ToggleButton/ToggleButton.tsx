import { SetStateAction, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './ToggleButton.css'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export default function ToggleButton() {

  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (buttonId: SetStateAction<string>) => {
    setActiveButton(buttonId);
};

  return (
      <>
      <Collapse in={open}>
        <div className="toggle-content">
          <button className={`button-ride ${activeButton === 'button1' ? 'active' : ''}`}
                onClick={() => handleClick('button1')}> <img src="https://i.goopics.net/52swkl.png"></img></button>
          <button className={`button-ride ${activeButton === 'button2' ? 'active' : ''}`}
                onClick={() => handleClick('button2')}><img src="https://i.goopics.net/wvrygn.png"></img></button>
        </div>
      </Collapse>
      <button 
            onClick={() => setOpen(!open)}
            className="shadow-none btn btn-toggle mb-5">
        {open ? <FaChevronUp className="chevron"/> : <FaChevronDown className="chevron"/>}
      </button>
      </>
  );
}