import React, { useState, useEffect } from "react";
import "../assets/css/Contact.css";

const SITE_KEY = "6LelBEYrAAAAAKDT-sgRSWOoZCBZyaAYCAJaOFCc"; // reCAPTCHA v2 invisible

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    businessType: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.onload = () => {
      console.log("✅ reCAPTCHA script loaded");
    };
    script.onerror = () => {
      console.error("❌ Error loading reCAPTCHA script");
    };
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Nombre requerido";
    if (!formData.email.trim()) newErrors.email = "Correo requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono requerido";
    if (!formData.business.trim()) newErrors.business = "Nombre de clínica requerido";
    if (!formData.businessType) newErrors.businessType = "Tipo de negocio requerido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Reset estados
    setSubmitStatus(null);
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsLoading(true);

    try {
      // Verificar que grecaptcha esté disponible
      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA no está disponible");
      }

      console.log("🔄 Generando token reCAPTCHA...");
      const token = await window.grecaptcha.execute(SITE_KEY, { action: "submit" });
      console.log("✅ TOKEN generado:", token.substring(0, 20) + "...");

      console.log("📤 Enviando datos al servidor...");
      const response = await fetch("https://api.interconecta.capital/api/contacto", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ ...formData, token }),
      });

      const result = await response.json();
      console.log("📥 Respuesta del servidor:", result);

      if (response.ok) {
        console.log("✅ Formulario enviado con éxito");
        setSubmitStatus('success');
        setFormSubmitted(true);
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          businessType: ''
        });
        
        // Auto-reset después de 5 segundos
        setTimeout(() => {
          setFormSubmitted(false);
          setSubmitStatus(null);
        }, 5000);
        
      } else {
        console.error("❌ Error del servidor:", result);
        setSubmitStatus('error');
        setErrors({ general: result.error || "Error del servidor" });
      }
    } catch (err) {
      console.error("❌ Error al enviar:", err);
      setSubmitStatus('error');
      setErrors({ 
        general: err.message === "reCAPTCHA no está disponible" 
          ? "Error de seguridad: reCAPTCHA no disponible" 
          : "Error de conexión. Verifica tu internet e intenta de nuevo."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="interconecta-contact-section">
      <div className="interconecta-container">
        <div className="interconecta-contact-wrapper">
          {/* Sección informativa a la izquierda */}
          <div className="interconecta-contact-content">
            <h2 className="interconecta-contact-title">¿Listo para transformar tu clínica o consultorio?</h2>
            <p className="interconecta-contact-description">
              Agenda una demo personalizada y descubre cómo Interconecta puede ayudarte a automatizar procesos, 
              ahorrar tiempo y mejorar la experiencia de tus pacientes.
            </p>
            <div className="interconecta-contact-benefits">
              <div className="interconecta-benefit-item">
                <div className="interconecta-benefit-icon">
                  <span className="interconecta-benefit-icon-inner">✓</span>
                </div>
                <p>Sin compromiso</p>
              </div>
              <div className="interconecta-benefit-item">
                <div className="interconecta-benefit-icon">
                  <span className="interconecta-benefit-icon-inner">✓</span>
                </div>
                <p>Demo personalizada</p>
              </div>
              <div className="interconecta-benefit-item">
                <div className="interconecta-benefit-icon">
                  <span className="interconecta-benefit-icon-inner">✓</span>
                </div>
                <p>Soporte dedicado</p>
              </div>
            </div>
          </div>

          {/* Formulario a la derecha */}
          <div className="interconecta-contact-form-wrapper">
            {!formSubmitted ? (
              <>
                <div className="interconecta-form-header">
                  <h3>Solicita tu demo gratis</h3>
                </div>

                <form className="interconecta-contact-form" onSubmit={handleSubmit}>
                  {/* Mensaje de error general */}
                  {errors.general && (
                    <div className="interconecta-error-message interconecta-general-error">
                      {errors.general}
                    </div>
                  )}

                  <div className="interconecta-form-group">
                    <label htmlFor="name">Nombre completo</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={errors.name ? 'interconecta-input-error' : ''}
                      disabled={isLoading}
                    />
                    {errors.name && <small className="interconecta-error-msg">{errors.name}</small>}
                  </div>

                  <div className="interconecta-form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className={errors.email ? 'interconecta-input-error' : ''}
                      disabled={isLoading}
                    />
                    {errors.email && <small className="interconecta-error-msg">{errors.email}</small>}
                  </div>

                  <div className="interconecta-form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ej. 5512345678"
                      className={errors.phone ? 'interconecta-input-error' : ''}
                      disabled={isLoading}
                    />
                    {errors.phone && <small className="interconecta-error-msg">{errors.phone}</small>}
                  </div>

                  <div className="interconecta-form-group">
                    <label htmlFor="business">Nombre de la clínica</label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Tu negocio"
                      className={errors.business ? 'interconecta-input-error' : ''}
                      disabled={isLoading}
                    />
                    {errors.business && <small className="interconecta-error-msg">{errors.business}</small>}
                  </div>

                  <div className="interconecta-form-group">
                    <label htmlFor="businessType">Tipo de negocio</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={errors.businessType ? 'interconecta-input-error' : ''}
                      disabled={isLoading}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Consultorio">Consultorio</option>
                      <option value="Clínica">Clínica</option>
                      <option value="Medical Spa">Medical Spa</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.businessType && <small className="interconecta-error-msg">{errors.businessType}</small>}
                  </div>

                  <div className="interconecta-form-group">
                    <button 
                      type="submit" 
                      className={`interconecta-btn interconecta-btn-primary interconecta-btn-full ${isLoading ? 'interconecta-loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="interconecta-spinner"></span>
                          Enviando...
                        </>
                      ) : (
                        'Solicitar demo'
                      )}
                    </button>
                  </div>

                  <div className="interconecta-form-group">
                    <a
                      href="https://wa.me/5215519686023?text=Hola, quiero solicitar una demo de Interconecta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interconecta-btn interconecta-btn-whatsapp interconecta-btn-full"
                    >
                      📱 Solicitar por WhatsApp
                    </a>
                  </div>

                  <p className="interconecta-privacy-note">
                    Este sitio está protegido por reCAPTCHA y se aplican la 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                      Política de privacidad
                    </a> y los 
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                      Términos de servicio
                    </a> de Google.
                  </p>
                </form>
              </>
            ) : (
              <div className="interconecta-form-success">
                <div className="interconecta-success-icon">✓</div>
                <h3>¡Solicitud enviada con éxito!</h3>
                <p>Nos pondremos en contacto contigo en las próximas 24 horas para agendar tu demo personalizada.</p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setSubmitStatus(null);
                  }}
                  className="interconecta-back-button"
                >
                  Enviar otra solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;