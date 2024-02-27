import "./Header.css";
import { useContext } from "react";
import ProfileButton from "../ProfileButton/ProfileButton";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { Link } from "react-router-dom";
import ThemeContext from '../../../contextAPI/themeContext';

export default function Header() {

  /**
   * Using useContext hook to access the current theme from ThemeContext
   */
  const { theme } = useContext(ThemeContext) || { theme: 'default' };

  /**
   * Dynamically setting the class name based on the current theme
   */
  const headerClassName = `header header-${theme}`;

  return (
    <header className={headerClassName}>
      {/*Call of the Profile Button component*/}
      <ProfileButton />

      {/*LOGO HEADER*/}
      {/* Using the Link component from react-router-dom for internal navigation. This prevents full page reloads and improves user experience*/}
      <Link to='/' id="button-logo"><img
        id="logo"
        src='/logo-bts-simplified-transparent-copie.png'
        alt="Website logo for Balance Ton Spot"
      ></img>
      </Link>

      {/*Call of the Toggle Button component*/}
      <ToggleTheme />
    </header>
  );
}


