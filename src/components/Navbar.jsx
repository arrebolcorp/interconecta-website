import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú automáticamente al cambiar de ruta
  React.useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    window.scrollTo(0, 0); // También sube al top cada vez que navegas
  }, [location.pathname]);

  const handleNavClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-wrapper">
        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/" onClick={handleNavClick}>
            <img src="/assets/images/logo-interconecta.png" alt="Interconecta Capital" />
          </Link>
        </div>

        {/* MENÚ */}
        <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleNavClick}>Inicio</Link></li>
            <li><Link to="/servicios" onClick={handleNavClick}>Servicios</Link></li>

            {/* Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="dropdown-label"><Link to="/planes-general">Planes</Link> <span className="dropdown-icon">▾</span></span>
              {dropdownOpen && (
                <ul className="submenu show">
                  <li><Link to="/planes-clinicas" onClick={handleNavClick}>Planes Clínicas</Link></li>
                  <li><Link to="/planes-consultorios" onClick={handleNavClick}>Planes Consultorios</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/contacto" onClick={handleNavClick}>Contacto</Link></li>
            <li><Link to="/reuniones" onClick={handleNavClick}>Diagnóstico</Link></li>
            <li><Link to="/calculadora-roi" onClick={handleNavClick}>Calcula tu ROI</Link></li>
            <li><Link to="/faq" onClick={handleNavClick}>FAQ</Link></li>
            <li>
              <Link to="/reuniones" className="btn-contratar" onClick={handleNavClick}>
                Contratar
              </Link>
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
