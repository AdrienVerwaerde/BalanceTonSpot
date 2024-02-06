
import "./Header.css";
import ProfileButton from "../ProfileButton/ProfileButton";
import ToggleButton from "../ToggleButton/ToggleButton";

export default function Header() {

  return (
    <header className="header">
{/*Call of the Profile Button component*/}
<ProfileButton />

{/*LOGO HEADER*/}
      <a id="button-logo" href="#"><img
              id="logo"
              src="https://i.goopics.net/r1wqq7.png"
              alt="Website logo for Balance Ton Spot"
            ></img></a>

{/*Call of the Toggle Button component*/}
<ToggleButton />  
    </header>
  );
};


