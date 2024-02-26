// Import necessary React hooks and router elements
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Importing CSS for styling
import ThemeContext from '../../contextAPI/themeContext'; // Importing the ThemeContext

// Footer component definition
export default function Footer() {
  // Using useContext hook to access the current theme from ThemeContext
  const { theme } = useContext(ThemeContext) || {};
  // Dynamically setting the class name based on the current theme
  const footerClassName = `footer footer-${theme}`;

  return (
    // Applying the dynamically set class name to the footer element
    <footer className={footerClassName}>
      <ul>
        {/* Using semantic HTML for accessibility and SEO */}
        {/* Ensure unique IDs or remove them if they are not necessary */}
        <li><Link to="/legal-notice" id="footer-link">MENTIONS LÉGALES</Link></li>
        <li><Link to="/contact" id="footer-link">NOUS CONTACTER</Link></li>
        {/* Using the Link component from react-router-dom for internal navigation */}
        {/* This prevents full page reloads and improves user experience */}
        <li><Link to="/our-team" id="footer-link">À PROPOS</Link></li>
      </ul>
    </footer>
  );
}

