import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Servicios.css';

const Servicios = () => {
  return (
    <div className="servicios-page">
      <section className="servicios-hero">
        <div className="container">
          <h1>Tu <span className="text-primary">AI Partner Médico</span> para automatizar tu consultorio</h1>
          <img src="/assets/images/profecional-img1.png" alt="Automatización" className="hero-service-image" />
          <p className="hero-subtitle">
            Somos tu <strong>Chief AI Officer</strong> fraccional: automatizamos <strong>WhatsApp</strong>, <strong>citas</strong>, <strong>pagos</strong>, <strong>seguimientos</strong> y más en menos de 7 días.
          </p>
          <div className="hero-buttons">
            <Link to="/planes-consultorios" className="btn btn-primary">Ver Planes</Link>
            <Link to="/reuniones" className="btn btn-outline">Solicita una Demo</Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <h2 className="section-title">Así como <span className="text-primary">María</span></h2>
          <div className="testimonial-card">
            <img src="/assets/images/maria-img2.png" alt="María" className="testimonial-image" />
            <p className="testimonial-text">
              "María, dueña de una <strong>Clínica Estética</strong>, redujo el tiempo de atención al cliente en un <strong>42.9%</strong> implementando nuestros <strong>bots personalizados</strong> para atender sus correos vía Gmail y WhatsApp."
            </p>
          </div>
          <p className="section-subtitle">Tú también puedes lograrlo. Pero cada semana sin <span className="text-primary">IA</span>, pierdes pacientes.</p>
        </div>
      </section>

      <section className="servicios-features">
        <div className="container">
          <h2 className="section-title">¿Qué podemos <span className="text-primary">automatizar</span> por ti?</h2>

          <div className="servicios-features-grid">
            <div className="servicios-feature-card">
              <img src="/assets/images/feature-agenda.png" alt="Agendamiento" className="feature-img" />
              <h3 className="servicios-feature-title">Atención automática <span className="text-primary">24/7</span></h3>
              <ul className="servicios-feature-list">
                <li>Agentes IA que responden <strong>WhatsApp</strong> sin que tú muevas un dedo.</li>
                <li>Confirma, reprograma o cancela <strong>citas</strong> sin esfuerzo humano.</li>
                <li><strong>Filtro inteligente</strong> de pacientes nuevos y frecuentes.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ia.png" alt="IA" className="feature-img" />
              <h3 className="servicios-feature-title">Flujos personalizados por <span className="text-primary">especialidad</span></h3>
              <ul className="servicios-feature-list">
                <li>Adaptados para <strong>estética</strong>, <strong>dermatología</strong>, <strong>cirugía</strong>, <strong>wellness</strong>, etc.</li>
                <li>Mensajes según tipo de paciente, servicio y horario.</li>
                <li><strong>Entrenamiento constante</strong> de la IA sin costo extra.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-crm.png" alt="CRM" className="feature-img" />
              <h3 className="servicios-feature-title">Gestión y <span className="text-primary">CRM automatizado</span></h3>
              <ul className="servicios-feature-list">
                <li><strong>Ficha médica</strong> y citas integradas en Google Sheets, NocoDB o CRM.</li>
                <li>Seguimientos post-tratamiento automatizados por especialidad.</li>
                <li><strong>Historial centralizado</strong> sin trabajo extra para ti.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ventas.png" alt="Ventas" className="feature-img" />
              <h3 className="servicios-feature-title">Campañas de <span className="text-primary">WhatsApp</span> con IA</h3>
              <ul className="servicios-feature-list">
                <li>Activa <strong>promociones</strong> por tipo de paciente o servicio.</li>
                <li>Envía mensajes automatizados con <strong>CTA personalizados</strong>.</li>
                <li>Campañas medibles: aperturas, clics y conversiones.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-pagos.png" alt="Pagos" className="feature-img" />
              <h3 className="servicios-feature-title">Pagos y <span className="text-primary">facturación</span> sin fricción</h3>
              <ul className="servicios-feature-list">
                <li>Enlace de pago automático con Stripe, Clip o MercadoPago.</li>
                <li>Factura generada al momento y enviada por WhatsApp.</li>
                <li>Reducción de errores contables y olvidos de pago.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-operacion.png" alt="Operación" className="feature-img" />
              <h3 className="servicios-feature-title">Operación médica sin <span className="text-primary">caos</span></h3>
              <ul className="servicios-feature-list">
                <li><strong>Dashboards</strong> semanales con métricas reales: atención, ventas, cancelaciones.</li>
                <li>Notificaciones al equipo por canal interno.</li>
                <li>Seguimiento continuo para mejoras cada mes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">¿Vas a seguir <span className="text-primary">perdiendo pacientes</span>?</h2>
          <p className="cta-texto-servicios"><strong>Interconecta</strong> lo automatiza todo por ti. Solo necesitas <strong>30 minutos</strong> para arrancar.</p>
          <Link to="/reuniones" className="btn btn-primary btn-large">Solicitar diagnóstico gratuito</Link>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
