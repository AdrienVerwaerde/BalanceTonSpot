import React, { useState } from 'react'
import './ProfileButton.css'

const ProfileButton = () => {
  

  //This function uses useState to toggle the list of options from the button
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="shadow-none btn btn-primary btn-profile mb-5">
              <img id="button-img" src="https://i.goopics.net/n3a13g.png"></img>
      </button>
      {toggle && (
        <ul className="list-group">
          <a href="#"><li className="list-group-item">An item</li></a>
          <a href="#"><li className="list-group-item">A second item</li></a>
          <a href="#"><li className="list-group-item">A third item</li></a>
          <a href="#"><li className="list-group-item">A fourth item</li></a>
          <a href="#"><li className="list-group-item">And a fifth one</li></a>
        </ul>
      )}
    </>
  )
}
export default ProfileButton