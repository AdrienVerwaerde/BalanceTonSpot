
import "./Header.css";
import ProfileButton from "../ProfileButton/ProfileButton";
import ToggleButton from "../ToggleButton/ToggleButton";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="header">
{/*Call of the Profile Button component*/}
<ProfileButton />

{/*LOGO HEADER*/}
      <Link to='/' id="button-logo"><img
              id="logo"
              src="https://i.goopics.net/qwh4qx.png"
              alt="Website logo for Balance Ton Spot"
            ></img></Link>

{/*Call of the Toggle Button component*/}
<ToggleButton />  
    </header>
  );
}


