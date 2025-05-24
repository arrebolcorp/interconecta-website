import React from "react";
import "../assets/css/Process.css";

const Process = () => {
  return (
    <section className="implement-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">¿Cómo transformamos tu consultorio en 7 días?</h2>
          <p className="section-subtitle">
            Un proceso clínico-operativo simple, pensado para médicos ocupados
          </p>
        </div>

        <div className="implement-steps">
          <div className="implement-step">
            <div className="implement-number">1</div>
            <div className="implement-content">
              <h3 className="implement-title">Diagnóstico clínico-operativo</h3>
              <p className="implement-description">
                Analizamos tu flujo de pacientes, WhatsApps pendientes y tiempos muertos. En solo 15 min detectamos los cuellos de botella.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">2</div>
            <div className="implement-content">
              <h3 className="implement-title">Propuesta personalizada</h3>
              <p className="implement-description">
                Te mostramos una solución a tu medida, según especialidad, tipo de paciente y herramientas actuales. Sin tecnicismos.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">3</div>
            <div className="implement-content">
              <h3 className="implement-title">Implementación en 7 días</h3>
              <p className="implement-description">
                Nuestro equipo configura todo sin que detengas tus consultas. No necesitas cambiar de sistema ni aprender software nuevo.
              </p>
            </div>
          </div>

          <div className="implement-step">
            <div className="implement-number">4</div>
            <div className="implement-content">
              <h3 className="implement-title">Optimización con IA</h3>
              <p className="implement-description">
                Analizamos el rendimiento de tu consultorio y aplicamos mejoras cada semana para maximizar tu retorno.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center implement-mt-50">
          <a href="/Reuniones" className="btn btn-primary">
            Solicita tu diagnóstico gratuito en 15 minutos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
