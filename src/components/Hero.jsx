import React from "react";
import "./Hero.css";

const Hero = ({ variant = "gradient" }) => {
  // Diferentes variantes de Hero
  const getHeroClasses = () => {
    const baseClasses = "hero-section";
    
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
      <div className="hero-container">
        {/* Texto - izquierda en desktop, abajo en móvil */}
        <div className="hero-content">
          <h1 className="hero-title">
            Automatización inteligente para tu{" "}
            <span className="text-primary">Consultorio y Clínica</span> y <span className="text-primary">Consultorio  Clínica</span>
          </h1>
          <p className="hero-subtitle">
            Te ayudamos a automatizar la atención al paciente, agendar pacientes sin errores y dar seguimiento sin esfuerzo, usando WhatsApp, IA y tecnología conectada a tu operación diaria.
          </p>
          <div className="hero-cta">
            <a href="#planes" className="btn-primary">Ver planes</a>
            <a href="https://wa.me/5215519686023?text=Hola, quiero solicitar mas informacion de los servicios de Interconecta" className="btn-outlinex">👋 Chatea con alguien</a>
          </div>
        </div>

        {/* Imagen - derecha en desktop, arriba en móvil */}
        <div className="hero-image-wrapper">
          <img 
            src="/assets/images/hero-illustration.png" 
            alt="Automatización para clínicas con Interconecta Capital"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;