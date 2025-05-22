import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Plans.css"; // Ajusta esta ruta según donde esté el archivo
const Plans = () => {
  const [activeTab, setActiveTab] = useState('clinicas');

  return (
    <section id="planes" className="plans-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Nuestros planes</h2>
          <p className="section-subtitle">Soluciones adaptadas a las necesidades específicas de tu negocio</p>
        </div>
        
        <div className="plans-tabs">
          <button 
            className={`plan-tab ${activeTab === 'consultorios' ? 'active' : ''}`}
            onClick={() => setActiveTab('consultorios')}
          >
            Para Consultorios
          </button>
          <button 
            className={`plan-tab ${activeTab === 'clinicas' ? 'active' : ''}`} 
            onClick={() => setActiveTab('clinicas')}
          >
            Para Clínicas
          </button>
        </div>
        
        <div className="plans-content">
          {/* Planes para Clínicas */}
          <div className={`plan-category ${activeTab === 'clinicas' ? 'active' : ''}`} id="clinicas">
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Plan Impulso</h3>
                  <p className="plan-subtitle">Operación inteligente</p>
                  <div className="plan-price">
                  <div className="price-amount">
  $2,388<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $4,200<span className="iva-note">+ I.V.A.</span> único
</div>

                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Asistente virtual por WhatsApp</li>
                    <li>Confirmación automática de citas</li>
                    <li>Formulario inteligente para nuevos pacientes</li>
                    <li>Registro en hoja de cálculo o CRM</li>
                    <li>Agenda inteligente según tipo de servicio</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-clinicas" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>
              
              <div className="plan-card featured">
                <div className="plan-badge">Recomendado</div>
                <div className="plan-header">
                  <h3 className="plan-name">Plan Crecimiento</h3>
                  <p className="plan-subtitle">Seguimiento y control</p>
                  <div className="plan-price">
                    <div className="price-amount">
  $4,788<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $7,800<span className="iva-note">+ I.V.A.</span> único
</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Impulso</li>
                    <li>Seguimiento automatizado post-cita</li>
                    <li>Recordatorios y cancelaciones automáticas</li>
                    <li>Encuesta NPS post atención</li>
                    <li>Integración con Google Calendar y CRM</li>
                    <li>Dashboard con indicadores clave</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-clinicas" className="btn btn-primary btn-full">Ver detalles</Link>
                </div>
              </div>
              
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Plan Dominio</h3>
                  <p className="plan-subtitle">Escalabilidad y marketing</p>
                  <div className="plan-price">
                    <div className="price-amount">
  $8,988<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $14,400<span className="iva-note">+ I.V.A.</span> único
</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Crecimiento</li>
                    <li>Automatización de pagos</li>
                    <li>Generación automática de cotizaciones</li>
                    <li>Campañas segmentadas por WhatsApp</li>
                    <li>Integración con Google Drive, Notion, CRM, Ads</li>
                    <li>Panel maestro con reportes por área</li>
                    <li>Soporte premium (respuesta en menos de 4h)</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-clinicas" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Planes para Consultorios */}
          <div className={`plan-category ${activeTab === 'consultorios' ? 'active' : ''}`} id="consultorios">
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Plan Esencial</h3>
                  <p className="plan-subtitle">Para comenzar</p>
                  <div className="plan-price">
                    <div className="price-amount">
  $890<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $2,900<span className="iva-note">+ I.V.A.</span> único
</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Asistente virtual básico</li>
                    <li>Agendamiento y recordatorios</li>
                    <li>Integración Google Calendar</li>
                    <li>Confirmación automática de citas</li>
                    <li>Soporte por correo electrónico</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>
              
              <div className="plan-card featured">
                <div className="plan-badge">Recomendado</div>
                <div className="plan-header">
                  <h3 className="plan-name">Plan Pro</h3>
                  <p className="plan-subtitle">Control total</p>
                  <div className="plan-price">
                    <div className="price-amount">
  $1,490<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $3,900<span className="iva-note">+ I.V.A.</span> único
</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Esencial</li>
                    <li>Asistente con IA</li>
                    <li>Panel de control</li>
                    <li>Seguimiento post-consulta</li>
                    <li>Formularios inteligentes</li>
                    <li>Soporte prioritario</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-primary btn-full">Ver detalles</Link>
                </div>
              </div>
              
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Plan Premium</h3>
                  <p className="plan-subtitle">Máximo rendimiento</p>
                  <div className="plan-price">
                    <div className="price-amount">
  $2,490<span className="iva-note">+ I.V.A.</span> <span>/ mes</span>
</div>
<div className="price-setup">
  Setup: $5,900<span className="iva-note">+ I.V.A.</span> único
</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Pro</li>
                    <li>IA personalizada</li>
                    <li>Campañas automáticas</li>
                    <li>Integraciones avanzadas</li>
                    <li>Análisis de datos</li>
                    <li>Soporte VIP 24/7</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-50">
          <a href="#contacto" className="btn btn-primary">Solicitar una demo personalizada</a>
        </div>
      </div>
    </section>
  );
};

export default Plans;