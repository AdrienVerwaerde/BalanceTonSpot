import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './HeaderUser.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function HeaderUser() {
    // Get the current location using the useLocation hook from react-router-dom
    const location = useLocation();

    return (
        <>
            {/* Header section */}
            <header className="navbar-container">
                <Navbar expand="lg" className="bg-body-tertiary profile-navbar">
                    <Container>
                        {/* Navbar brand */}
                        <Navbar.Brand id="my-profile">
                            {/* Display different text based on the current pathname */}
                            {location.pathname === '/favoris' ? 'MES FAVORIS' : 'MON PROFIL'}
                        </Navbar.Brand>
                        {/* Navbar toggle button */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {/* Navbar collapse section */}
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* Link to the home page */}
                                <Link className="header-user-link" to="/">Retour à l'accueil</Link>
                                {/* Link to either the profile or favorites page based on the current pathname */}
                                <Link className="header-user-link" to={location.pathname === '/favoris' ? '/profile' : '/favoris'}>
                                    {location.pathname === '/favoris' ? 'Mon profil' : 'Mes favoris'}
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            {/* Render the child components */}
            <Outlet />
        </>
    );
}
