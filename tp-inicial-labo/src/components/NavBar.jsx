import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Búsqueda de Autos</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/gestion-mecanicos" className="navbar-link">Gestión de Mecánicos</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
