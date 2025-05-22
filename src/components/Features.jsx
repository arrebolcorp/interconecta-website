import React from "react";
import "../assets/css/Features.css"; // Ajusta esta ruta según donde esté el archivo

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">¿Qué logramos con la automatización?</h2>
          <p className="section-subtitle">Transformamos la operación diaria de tu clínica o consultorio</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-time.png" alt="Ahorro de tiempo" />
            </div>
            <h3 className="feature-title">Ahorro de tiempo</h3>
            <p className="feature-description">Reducimos hasta 80 horas mensuales de tareas administrativas, permitiéndote enfocarte en la atención al paciente.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-calendar.png" alt="Menos cancelaciones" />
            </div>
            <h3 className="feature-title">Menos cancelaciones</h3>
            <p className="feature-description">Implementamos sistemas inteligentes de confirmación que reducen hasta un 60% las cancelaciones de último minuto.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-growth.png" alt="Mayor conversión" />
            </div>
            <h3 className="feature-title">Mayor conversión</h3>
            <p className="feature-description">Nuestro asistente virtual responde consultas 24/7, aumentando la conversión de prospectos en un 35%.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/images/icon-user.png" alt="Experiencia mejorada" />
            </div>
            <h3 className="feature-title">Experiencia mejorada</h3>
            <p className="feature-description">Ofrecemos una atención consistente y personalizada que incrementa la satisfacción y retención de pacientes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;