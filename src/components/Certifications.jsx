import React from "react";
import "./Certifications.css";

const certifications = [
  
  { name: "NOM-004-SSA3", src: "/assets/images/aicpa-logo.png" },
  { name: "HIPAA", src: "/assets/images/hipaa-logo.png" },
  { name: "NOM-004-SSA3", src: "/assets/images/gdpr-logo.png" },
  { name: "LGPD", src: "/assets/images/lgpd-logo.png" },
  { name: "NOM-004-SSA3", src: "/assets/images/soc-logo.png" },
  { name: "NOM-004-SSA3", src: "/assets/images/nom004-logo.png" },
  { name: "NOM-004-SSA3", src: "/assets/images/dataen-logo.png" }
  // Puedes agregar más logos aquí
];

const Certifications = () => {
  return (
    <section className="certifications-wrapper">
      <div className="certifications-inner">
        <div className="certifications-title">
          <h3>Certificaciones de Seguridad Social y Ciberseguridad</h3>
          <p>Cumplimos con las principales normativas que protegen tus datos y los de tus pacientes.</p>
        </div>
        <div className="certifications-logos">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-logo">
              <img src={cert.src} alt={`Certificación ${cert.name}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
