import React from "react";
import "../assets/css/Features.css";

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">¿Qué logramos con la automatización médica?</h2>
          <p className="section-subtitle">Beneficios reales para tu consultorio o clínica, desde el primer mes</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-time.png" alt="Asistente IA 24/7" />
            </div>
            <h3 className="feature-title">Asistente IA 24/7</h3>
            <p className="feature-description">Atiende WhatsApps médicos día y noche, sin descanso. Responde dudas frecuentes, filtra prospectos y agenda citas automáticamente.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-calendar.png" alt="Confirmación inteligente de citas" />
            </div>
            <h3 className="feature-title">Confirmación inteligente de citas</h3>
            <p className="feature-description">Disminuye hasta 60% las cancelaciones con recordatorios automáticos, confirmaciones y lista de espera inteligente.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-growth.png" alt="Captura más pacientes" />
            </div>
            <h3 className="feature-title">Captura más pacientes</h3>
            <p className="feature-description">Convierte mensajes en consultas: aumenta hasta 35% tu tasa de conversión con respuesta instantánea a leads médicos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-user.png" alt="Pacientes mejor atendidos" />
            </div>
            <h3 className="feature-title">Pacientes mejor atendidos</h3>
            <p className="feature-description">Automatizamos tus seguimientos post-tratamiento para que cada paciente se sienta escuchado, incluso fuera de horario.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
