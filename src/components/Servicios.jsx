import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Servicios.css';

const Servicios = () => {
  return (
    <div className="servicios-page">
      <section className="servicios-hero">
        <div className="servicios-container">
          <h1>Tu <span className="servicios-text-primary-color">AI Partner Médico</span> para automatizar tu consultorio</h1>
          <img src="/assets/images/profecional-img1.png" alt="Automatización Médica" className="servicios-hero-service-image" />
          <p className="servicios-hero-subtitle">
            Somos tu <strong>Chief AI Officer</strong> fraccional: automatizamos <strong>WhatsApp</strong>, <strong>citas</strong>, <strong>pagos</strong>, <strong>seguimientos</strong> y más en menos de 7 días.
          </p>
          <div className="servicios-hero-buttons">
            <Link to="/planes-general" className="servicios-btn servicios-btn-primary">Ver Planes</Link>
            <Link to="/reuniones" className="servicios-btn servicios-btn-outline">Solicita una Demo</Link>
          </div>
        </div>
      </section>

      <section className="servicios-testimonial-section">
        <div className="servicios-container">
          <h2 className="servicios-section-title">Así como <span className="servicios-text-primary-color">María</span></h2>
          <div className="servicios-testimonial-card">
            <img src="/assets/images/maria-img2.png" alt="María - Cliente Satisfecha" className="servicios-testimonial-image" />
            <p className="servicios-testimonial-text">
              "María, dueña de una <strong>Clínica Estética</strong>, redujo el tiempo de atención al cliente en un <strong>42.9%</strong> implementando nuestros <strong>bots personalizados</strong> para atender sus correos vía Gmail y WhatsApp."
            </p>
          </div>
          <p className="servicios-section-subtitle">Tú también puedes lograrlo. Pero cada semana sin <span className="servicios-text-primary-color">IA</span>, pierdes pacientes.</p>
        </div>
      </section>

      <section className="servicios-features">
        <div className="servicios-container">
          <h2 className="servicios-section-title">¿Qué podemos <span className="servicios-text-primary-color">automatizar</span> por ti?</h2>

          <div className="servicios-features-grid">
            <div className="servicios-feature-card">
              <img src="/assets/images/feature-agenda.png" alt="Agendamiento Automático" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Atención automática <span className="servicios-text-primary-color">24/7</span></h3>
              <ul className="servicios-feature-list">
                <li>Agentes IA que responden <strong>WhatsApp</strong> sin que tú muevas un dedo.</li>
                <li>Confirma, reprograma o cancela <strong>citas</strong> sin esfuerzo humano.</li>
                <li><strong>Filtro inteligente</strong> de pacientes nuevos y frecuentes.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ia.png" alt="IA Especializada" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Flujos personalizados por <span className="servicios-text-primary-color">especialidad</span></h3>
              <ul className="servicios-feature-list">
                <li>Adaptados para <strong>estética</strong>, <strong>dermatología</strong>, <strong>cirugía</strong>, <strong>wellness</strong>, etc.</li>
                <li>Mensajes según tipo de paciente, servicio y horario.</li>
                <li><strong>Entrenamiento constante</strong> de la IA sin costo extra.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-crm.png" alt="CRM Automatizado" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Gestión y <span className="servicios-text-primary-color">CRM automatizado</span></h3>
              <ul className="servicios-feature-list">
                <li><strong>Ficha médica</strong> y citas integradas en Google Sheets, NocoDB o CRM.</li>
                <li>Seguimientos post-tratamiento automatizados por especialidad.</li>
                <li><strong>Historial centralizado</strong> sin trabajo extra para ti.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-ventas.png" alt="Campañas WhatsApp" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Campañas de <span className="servicios-text-primary-color">WhatsApp</span> con IA</h3>
              <ul className="servicios-feature-list">
                <li>Activa <strong>promociones</strong> por tipo de paciente o servicio.</li>
                <li>Envía mensajes automatizados con <strong>CTA personalizados</strong>.</li>
                <li>Campañas medibles: aperturas, clics y conversiones.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-pagos.png" alt="Pagos Automatizados" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Pagos y <span className="servicios-text-primary-color">facturación</span> sin fricción</h3>
              <ul className="servicios-feature-list">
                <li>Enlace de pago automático con Stripe, Clip o MercadoPago.</li>
                <li>Factura generada al momento y enviada por WhatsApp.</li>
                <li>Reducción de errores contables y olvidos de pago.</li>
              </ul>
            </div>

            <div className="servicios-feature-card">
              <img src="/assets/images/feature-operacion.png" alt="Operación Médica" className="servicios-feature-img" />
              <h3 className="servicios-feature-title">Operación médica sin <span className="servicios-text-primary-color">caos</span></h3>
              <ul className="servicios-feature-list">
                <li><strong>Dashboards</strong> semanales con métricas reales: atención, ventas, cancelaciones.</li>
                <li>Notificaciones al equipo por canal interno.</li>
                <li>Seguimiento continuo para mejoras cada mes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="servicios-cta-section">
        <div className="servicios-container">
          <h2 className="servicios-cta-title">¿Vas a seguir <span style={{color: 'rgba(255,255,255,0.9)'}}>perdiendo pacientes</span>?</h2>
          <p className="servicios-cta-texto"><strong>Interconecta</strong> lo automatiza todo por ti. Solo necesitas <strong>30 minutos</strong> para arrancar.</p>
          <Link to="/reuniones" className="servicios-btn servicios-btn-primary servicios-btn-large">Solicitar diagnóstico gratuito</Link>
        </div>
      </section>
    </div>
  );
};

export default Servicios;