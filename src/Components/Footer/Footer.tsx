
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 
import ThemeContext from '../../contextAPI/themeContext'; 

export default function Footer() {
  /**
   * Using useContext hook to access the current theme from ThemeContext
   */ 
  const { theme } = useContext(ThemeContext) || {};

  /**
   * Dynamically setting the class name based on the current theme
   */
  const footerClassName = `footer footer-${theme}`;

  return (
    // Applying the dynamically set class name to the footer element
    <footer className={footerClassName}>
      <ul>
        <li><Link to="/legal-notice" id="footer-link">MENTIONS LÉGALES</Link></li>
        <li><Link to="/contact" id="footer-link">NOUS CONTACTER</Link></li>
        {/* Using the Link component from react-router-dom for internal navigation. This prevents full page reloads and improves user experience*/}
        <li><Link to="/our-team" id="footer-link">À PROPOS</Link></li>
      </ul>
    </footer>
  );
}

