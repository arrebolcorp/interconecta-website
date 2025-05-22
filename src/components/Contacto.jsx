import React, { useState } from "react";
import "../assets/css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    businessType: ''
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nombre requerido";
    if (!formData.email) newErrors.email = "Correo requerido";
    if (!formData.phone) newErrors.phone = "Teléfono requerido";
    if (!formData.business) newErrors.business = "Nombre de la clínica requerido";
    if (!formData.businessType) newErrors.businessType = "Selecciona un tipo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          businessType: ''
        });
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-content">
            <h2 className="contact-title">¿Listo para transformar tu clínica o consultorio?</h2>
            <p className="contact-description">
              Agenda una demo personalizada y descubre cómo Interconecta puede ayudarte a automatizar procesos, 
              ahorrar tiempo y mejorar la experiencia de tus pacientes.
            </p>
            <div className="contact-benefits">
              <div className="benefit-item">
                <div className="benefit-icon"><span className="benefit-icon-inner">✓</span></div>
                <p>Sin compromiso</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><span className="benefit-icon-inner">✓</span></div>
                <p>Demo personalizada</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon"><span className="benefit-icon-inner">✓</span></div>
                <p>Soporte dedicado</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {!formSubmitted ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-header"><h3>Solicita tu demo gratis</h3></div>

                {[
                  { label: "Nombre completo", name: "name", type: "text", placeholder: "Tu nombre" },
                  { label: "Correo electrónico", name: "email", type: "email", placeholder: "correo@ejemplo.com" },
                  { label: "Teléfono", name: "phone", type: "tel", placeholder: "Ej. 5512345678" },
                  { label: "Nombre de la clínica", name: "business", type: "text", placeholder: "Tu negocio" }
                ].map((field, idx) => (
                  <div key={idx} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <small className="error-msg">{errors[field.name]}</small>}
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="businessType">Tipo de negocio</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Consultorio">Consultorio</option>
                    <option value="Clínica">Clínica</option>
                    <option value="Medical Spa">Medical Spa</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.businessType && <small className="error-msg">{errors.businessType}</small>}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-full">Solicitar demo</button>
                </div>

                <div className="form-group">
                  <a
                    href="https://wa.me/5215519686023?text=Hola, quiero solicitar una demo de Interconecta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-full"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#fff",
                      textAlign: "center",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      display: "block",
                      textDecoration: "none",
                      marginTop: "0.5rem",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Solicitar por WhatsApp
                  </a>
                </div>
              </form>
            ) : (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>¡Solicitud enviada con éxito!</h3>
                <p>Nos pondremos en contacto contigo en las próximas 24 horas para agendar tu demo personalizada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
