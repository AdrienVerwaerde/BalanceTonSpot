import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <ul>
      <li><a id="footer-link" href="#">MENTIONS LÉGALES</a></li>
      <li><a id="footer-link" href="#">NOUS CONTACTER</a></li>
      <li><Link id="footer-link" to="/our-team">À PROPOS</Link></li>
      </ul>
    </footer>
  )
}
