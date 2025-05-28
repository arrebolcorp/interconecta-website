// Hero.jsx (Reetiquetado)
import React from "react";
import "./Hero.css";

const Hero = ({ variant = "gradient" }) => {
  const getHeroClasses = () => {
    const baseClasses = "hero-ai-section";
    switch (variant) {
      case "full-height":
        return `${baseClasses} full-height`;
      case "dotted":
        return `${baseClasses} dotted-bg`;
      case "gradient":
      default:
        return baseClasses;
    }
  };

  return (
    <section className={getHeroClasses()}>
      <div className="hero-ai-container">
        <div className="hero-ai-content">
          <h1 className="hero-ai-title">
            El <span className="text-primary">AI Partner</span> que tu {" "}
            <span className="text-primary">consultorio médico</span> necesita
          </h1>
          <p className="hero-ai-subtitle">
            Automatización médica inteligente que funciona 24/7. Nunca más pierdas un paciente por no responder a tiempo.
          </p>
          <div className="hero-ai-cta">
            <a href="#planes" className="btn-primary">Diagnóstico gratuito 30 min</a>
            <a href="https://wa.me/525651622408?text=Hola, soy médico y quiero automatizar mi consultorio. ¿Pueden ayudarme?" className="btn-outlinex">👩‍⚕️ Chatea con un agente</a>
          </div>

          <div className="hero-ai-trust">
            <div className="trust-item">
              <span className="trust-icon">🏥</span>
              <span className="trust-text">Especialistas en el área de la salud</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text">Implementación en aprox. 7 días</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">📈</span>
              <span className="trust-text">ROI promedio 400% primer mes</span>
            </div>
          </div>
        </div>

        <div className="hero-ai-image-wrapper">
          <img 
            src="/assets/images/hero-illustration.png" 
            alt="Chief AI Officer fraccional para consultorios médicos - Automatización médica con IA"
            className="hero-ai-image"
          />

          <div className="floating-element element-1">
            <div className="medical-stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Consultas capturadas</div>
            </div>
          </div>

          <div className="floating-element element-2">
            <div className="medical-stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Asistente médico IA</div>
            </div>
          </div>

          <div className="floating-element element-3">
            <div className="medical-stat-card">
              <div className="stat-number">-60%</div>
              <div className="stat-label">Cancelaciones</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-ai-social-proof">
        <div className="container">
          <p className="social-proof-intro">Ya confían en nosotros:</p>
          <div className="medical-testimonials-mini">
            <div className="hero-ai-testimonial-mini">
              <span className="specialty">Dermatología Estética</span>
              <span className="result">"Pasé de perder 15 pacientes/mes a capturar el 95%"</span>
            </div>
            <div className="hero-ai-testimonial-mini">
              <span className="specialty">Cirugía Plástica</span>
              <span className="result">"Mi consultorio funciona mientras duermo"</span>
            </div>
            <div className="hero-ai-testimonial-mini">
              <span className="specialty">Clínica Guadalajara</span>
              <span className="result">"Coordinamos 3 especialistas sin errores"</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
