import './Footer.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import ThemeContext from '../../contextAPI/themeContext'; 

export default function Footer() {

  const { theme } = useContext(ThemeContext);
  const FooterClassName = `footer footer-${theme}`;

  return (
    <footer className={FooterClassName}>
      <ul>
      <li><a id="footer-link" href="#">MENTIONS LÉGALES</a></li>
      <li><a id="footer-link" href="#">NOUS CONTACTER</a></li>
      <li><Link id="footer-link" to="/our-team">À PROPOS</Link></li>
      </ul>
    </footer>
  )
}
