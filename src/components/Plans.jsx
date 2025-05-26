import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Plans.css";

const Plans = () => {
  const [activeTab, setActiveTab] = useState('clinicas');

  return (
    <section id="planes" className="plans-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Planes diseñados para profesionales de la salud que quieren dejar de perder pacientes</h2>
          <p className="section-subtitle">
            Escoge el nivel de automatización que tu consultorio o clínica necesita. Todos incluyen nuestro Diagnóstico Operativo gratuito.
          </p>
        </div>

        <div className="plans-tabs">
          <button className={`plan-tab ${activeTab === 'consultorios' ? 'active' : ''}`} onClick={() => setActiveTab('consultorios')}>
            Para Consultorios
          </button>
          <button className={`plan-tab ${activeTab === 'clinicas' ? 'active' : ''}`} onClick={() => setActiveTab('clinicas')}>
            Para Clínicas
          </button>
          <button className={`plan-tab ${activeTab === 'enterprise' ? 'active' : ''}`} onClick={() => setActiveTab('enterprise')}>
            Enterprise
          </button>
        </div>

        <div className="plans-content">
          {/* Planes para Clínicas */}
          <div className={`plan-category ${activeTab === 'clinicas' ? 'active' : ''}`} id="clinicas">
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Impulso Plus</h3>
                  <p className="plan-subtitle">Para clínicas que inician automatización</p>
                  <div className="plan-price">
                    <div className="price-amount">$3,500<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Setup: $4,200<span className="iva-note">+ I.V.A.</span> único</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Asistente virtual por WhatsApp 24/7</li>
                    <li>Confirmación automática de citas</li>
                    <li>Formulario inteligente para nuevos pacientes</li>
                    <li>Registro en CRM o hoja médica digital</li>
                    <li>Agenda inteligente por tipo de servicio</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-clinicas" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>

              <div className="plan-card featured">
                <div className="plan-badge">Recomendado</div>
                <div className="plan-header">
                  <h3 className="plan-name">Crecimiento Plus</h3>
                  <p className="plan-subtitle">Seguimiento, control y retención</p>
                  <div className="plan-price">
                    <div className="price-amount">$6,000<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Setup: $7,800<span className="iva-note">+ I.V.A.</span> único</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Impulso Plus</li>
                    <li>Seguimiento automatizado post-cita</li>
                    <li>Recordatorios, cancelaciones y reprogramaciones</li>
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
                  <h3 className="plan-name">Dominio Plus</h3>
                  <p className="plan-subtitle">Escalabilidad, campañas y reportes</p>
                  <div className="plan-price">
                    <div className="price-amount">$12,000<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Setup: $14,400<span className="iva-note">+ I.V.A.</span> único</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Crecimiento Plus</li>
                    <li>Automatización de pagos</li>
                    <li>Campañas segmentadas por WhatsApp</li>
                    <li>Integraciones con Google Drive, Notion, CRM y Ads</li>
                    <li>Panel maestro con reportes operativos</li>
                    <li>Soporte VIP (respuesta en menos de 4h)</li>
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
                  <h3 className="plan-name">Esencial Plus</h3>
                  <p className="plan-subtitle">Ideal para consultorios individuales</p>
                  <div className="plan-price">
                    <div className="price-amount">$1,500<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Sin costo de setup</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Asistente virtual básico</li>
                    <li>Agendamiento automático</li>
                    <li>Recordatorios por WhatsApp</li>
                    <li>Integración con Google Calendar</li>
                    <li>Confirmación automática de citas</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>

              <div className="plan-card featured">
                <div className="plan-badge">Recomendado</div>
                <div className="plan-header">
                  <h3 className="plan-name">Pro Plus</h3>
                  <p className="plan-subtitle">Control completo del consultorio</p>
                  <div className="plan-price">
                    <div className="price-amount">$2,500<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Setup: $3,900<span className="iva-note">+ I.V.A.</span> único</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Esencial Plus</li>
                    <li>Asistente con IA médica</li>
                    <li>Panel de control del consultorio</li>
                    <li>Seguimiento post-consulta automatizado</li>
                    <li>Formularios médicos inteligentes</li>
                    <li>Soporte prioritario</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-primary btn-full">Ver detalles</Link>
                </div>
              </div>

              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Premium Plus</h3>
                  <p className="plan-subtitle">Automatización y expansión</p>
                  <div className="plan-price">
                    <div className="price-amount">$4,000<span className="iva-note">+ I.V.A.</span> <span>/ mes</span></div>
                    <div className="price-setup">Setup: $5,900<span className="iva-note">+ I.V.A.</span> único</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Pro Plus</li>
                    <li>IA personalizada por especialidad</li>
                    <li>Campañas automáticas y marketing médico</li>
                    <li>Integraciones avanzadas (CRM, Ads, Notion)</li>
                    <li>Análisis de datos y reportes de rendimiento</li>
                    <li>Soporte VIP 24/7</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <Link to="/planes-consultorios" className="btn btn-outline btn-full">Ver detalles</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Enterprise */}
          <div className={`plan-category ${activeTab === 'enterprise' ? 'active' : ''}`} id="enterprise">
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-header">
                  <h3 className="plan-name">Enterprise</h3>
                  <p className="plan-subtitle">Automatización avanzada y desarrollos a medida</p>
                  <div className="plan-price">
                    <div className="price-amount">A medida</div>
                    <div className="price-setup">Contáctanos para cotización</div>
                  </div>
                </div>
                <div className="plan-features">
                  <ul>
                    <li>Todo lo del plan Dominio Plus</li>
                    <li>Infraestructura dedicada por clínica</li>
                    <li>Desarrollos personalizados e integraciones exclusivas</li>
                    <li>Soporte estratégico y técnico especializado</li>
                    <li>Capacidad ilimitada de escalamiento</li>
                    <li>Acceso a funciones enterprise beta</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <a href="#contacto" className="btn btn-primary btn-full">Contactar a ventas</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-50">
          <a href="/planes-general" className="btn btn-primary">Quiero automatizar mi consultorio</a>
        </div>
      </div>
    </section>
  );
};

export default Plans;
