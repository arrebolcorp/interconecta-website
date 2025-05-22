import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/Servicios.css';

const Servicios = () => {
  return (
    <div className="servicios-page">
      <section className="servicios-hero">
        <div className="container">
          <h1>Servicios de Automatización para Consultorios y Clínicas</h1>
          <img src="/assets/images/profecional-img1.png" alt="Automatización" className="hero-service-image" />
          <p className="hero-subtitle">
            Libera tiempo, mejora tu atención y haz crecer tu clínica con soluciones automatizadas, inteligentes y 100% personalizadas.
          </p>
          <div className="hero-buttons">
            <Link to="/planes-consultorios" className="btn btn-primary">Ver Planes</Link>
            <Link to="/reuniones" className="btn btn-outline">Solicita una Demo</Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <h2 className="section-title">Así como María</h2>
          <div className="testimonial-card">
          <img src="/assets/images/maria-img2.png" alt="María" className="testimonial-image" />
          <p className="testimonial-text">
              "María, dueña de una Clínica Estética, redujo el tiempo de atención al cliente en un 42.9% implementando nuestros bots personalizados para atender sus correos vía Gmail y Whatsapp."
            </p>
          </div>
          <p className="section-subtitle">Así es como funciona ‍</p>
        </div>
      </section>

      <section className="servicios-features">
        <div className="container">
          <h2 className="section-title">Éstas son las características que te ayudan a crecer</h2>
          
          <div className="servicios-features-grid">
            <div className="servicios-feature-card">
              <img src="/assets/images/feature-agenda.png" alt="Agendamiento" className="feature-img" />
              <h3 className="servicios-feature-title">Automatización de Atención y Agendamiento</h3>
              <ul className="servicios-feature-list">
                <li>Agentes inteligentes que gestionan citas desde WhatsApp e Instagram.</li>
                <li>Recordatorios automáticos que reducen ausencias hasta en un 50%.</li>
                <li>Seguimiento post-atención para fidelizar y obtener reseñas.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ia.png" alt="IA" className="feature-img" />
              <h3 className="servicios-feature-title">Inteligencia Artificial para Atención y Contenidos</h3>
              <ul className="servicios-feature-list">
                <li>IA entrenada en servicios, precios y horarios.</li>
                <li>Generación rápida de respuestas y contenidos.</li>
                <li>Mejora continua con análisis de lenguaje y comportamiento.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-crm.png" alt="CRM" className="feature-img" />
              <h3 className="servicios-feature-title">CRM y Gestión Inteligente de Pacientes</h3>
              <ul className="servicios-feature-list">
                <li>Registro automático de pacientes e historial clínico.</li>
                <li>Segmentación por tratamiento y comportamiento.</li>
                <li>Seguimientos personalizados según cada perfil.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ventas.png" alt="Ventas" className="feature-img" />
              <h3 className="servicios-feature-title">Automatización de Ventas</h3>
              <ul className="servicios-feature-list">
                <li>Upselling y cross-selling vía chat automatizado.</li>
                <li>Campañas de recuperación de pacientes inactivos.</li>
                <li>Integración con IA para cerrar más ventas.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-pagos.png" alt="Pagos" className="feature-img" />
              <h3 className="servicios-feature-title">Pasarela de Pagos Automáticos</h3>
              <ul className="servicios-feature-list">
                <li>Paga y recibe comprobante por WhatsApp en segundos.</li>
                <li>Conexión directa con Stripe, Clip, MercadoPago, etc.</li>
                <li>Automatiza facturación y reduce errores manuales.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-operacion.png" alt="Operación" className="feature-img" />
              <h3 className="servicios-feature-title">Automatización Operativa</h3>
              <ul className="servicios-feature-list">
                <li>Dashboards y reportes semanales automáticos.</li>
                <li>Optimización de tareas repetitivas y flujos de trabajo.</li>
                <li>Métricas clave en tiempo real.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¡Toma el control de tu operación ya!</h2>
          <p className="cta-text"><strong>Interconecta</strong> te ayuda a que funcione como un reloj, sin estrés ni saturación.</p>
          <Link to="/reuniones" className="btn btn-primary btn-large">Agenda Gratis</Link>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
