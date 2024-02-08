import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './HeaderUser.css'
import { Link } from 'react-router-dom';

export default function HeaderUser() {
    return (
        <div className="navbar-container">
            <Navbar expand="lg" className="bg-body-tertiary profile-navbar">
                <Container>
                    <Navbar.Brand id="my-profile">MON PROFIL</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="header-user-link" to="/">Retour à l'accueil</Link>
                            <Link className="header-user-link" to="/Favoris">Mes Favoris</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
