import "./Header.css";
import { useContext } from "react";
import ProfileButton from "../ProfileButton/ProfileButton";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { Link } from "react-router-dom";
import ThemeContext from '../../../contextAPI/themeContext';  

export default function Header() {

  const { theme } = useContext(ThemeContext) || { theme: 'default' };
  const headerClassName = `header header-${theme}`;

  return (
    <header className={headerClassName}>
{/*Call of the Profile Button component*/}
<ProfileButton />

{/*LOGO HEADER*/}
      <Link to='/' id="button-logo"><img
              id="logo"
              src="https://i.postimg.cc/0QHzDXTz/logo-bts-simplified-transparent-copie.png"
              alt="Website logo for Balance Ton Spot"
            ></img></Link>

{/*Call of the Toggle Button component*/}
<ToggleTheme />  
    </header>
  );
}


