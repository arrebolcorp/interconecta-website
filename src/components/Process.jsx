import React from "react";
import "../assets/css/Process.css"; // Asegúrate de que este archivo tenga las nuevas clases implement-*

const Process = () => {
  return (
    <section className="implement-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Cómo implementamos la automatización</h2>
          <p className="section-subtitle">
            Un proceso ágil y sencillo diseñado para no interrumpir tu operación
          </p>
        </div>

        <div className="implement-steps">
          <div className="implement-step">
            <div className="implement-number">1</div>
            <div className="implement-content">
              <h3 className="implement-title">Diagnóstico</h3>
              <p className="implement-description">
                Analizamos tu operación actual e identificamos oportunidades de automatización con alto impacto.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">2</div>
            <div className="implement-content">
              <h3 className="implement-title">Propuesta</h3>
              <p className="implement-description">
                Diseñamos una solución personalizada basada en tus necesidades específicas y objetivos de negocio.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">3</div>
            <div className="implement-content">
              <h3 className="implement-title">Implementación</h3>
              <p className="implement-description">
                En solo 7 días, configuramos y ponemos en marcha tu sistema de automatización, con mínima intervención requerida.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">4</div>
            <div className="implement-content">
              <h3 className="implement-title">Optimización</h3>
              <p className="implement-description">
                Monitoreamos y mejoramos continuamente tu sistema para maximizar resultados a lo largo del tiempo.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center implement-mt-50">
          <a href="/Reuniones" className="btn btn-primary">
            Solicitar diagnóstico gratuito
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
