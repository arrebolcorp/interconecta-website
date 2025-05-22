import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-wrapper">
        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/assets/images/logo-interconecta.png" alt="Interconecta Capital" />
          </Link>
        </div>

        {/* MENÚ */}
        <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>

            {/* Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
<span className="dropdown-label">
  Planes <span className="dropdown-icon">▾</span>
</span>              {dropdownOpen && (
                <ul className="submenu show">
                  <li><Link to="/planes-clinicas">Planes Clínicas</Link></li>
                  <li><Link to="/planes-consultorios">Planes Consultorios</Link></li>
                </ul>
              )}
            </li>

            <li><a href="../Contacto">Contacto</a></li>
            <li><Link to="/reuniones">Diagnóstico</Link></li>
            <li><Link to="/calculadora-roi">Calcula tu ROI</Link></li>
            <li>
              <a href="/reuniones" className="btn-contratar">Contratar</a>
            </li>
          </ul>
        </nav>

        {/* Hamburguesa móvil */}
        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
