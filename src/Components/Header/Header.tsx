import React, { useState } from "react";
import {
  Segment,
  Icon,
  Menu,
  MenuItem,
  Sidebar,
  Grid,
} from "semantic-ui-react";
import "./Header.css";
import ProfileButton from "../ProfileButton/ProfileButton";

export default function Header() {
  
  return (
    <header className="header">
{/*Call of the component Profile Button*/}
<ProfileButton />

{/*LOGO HEADER*/}
      <a id="button-logo" href="#"><img
              id="logo"
              src="https://i.goopics.net/r1wqq7.png"
              alt="Balance Ton Spot"
            ></img></a>

{/*BUTTON WRAPPER*/}
            <button id="sidebar-button">V</button>   
    </header>
  );
};


