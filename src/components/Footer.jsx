import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Footer.css"; // Ajusta esta ruta según donde esté el archivo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/assets/images/logo-interconecta-white.png" alt="Interconecta Capital" />
            <p className="footer-tagline">Automatización con propósito humano</p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4 className="footer-heading">Empresa</h4>
              <ul className="footer-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4 className="footer-heading">Planes</h4>
              <ul className="footer-links">
                <li><Link to="/planes-clinicas">Para Clínicas</Link></li>
                <li><Link to="/planes-consultorios">Para Consultorios</Link></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4 className="footer-heading">Contacto</h4>
              <ul className="footer-contact-info">
                <li><a href="mailto:hola@interconecta.capital">hola@interconecta.capital</a></li>
                <li><a href="tel:+525512345678">+52 55 1968 6023</a></li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Interconecta Capital. Todos los derechos reservados.
          </div>
          
          <div className="social-links">
            <a href="https://linkedin.com/interconecta/" target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">in</span>
            </a>
            <a href="https://instagram.com/interconecta.capital" target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">ig</span>
            </a>
            <a href="https://twitter.com/interconecta.capilta" target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">tw</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;