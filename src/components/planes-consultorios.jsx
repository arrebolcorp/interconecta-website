import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../assets/css/planes-consultorios.css';



const ConsultoriosPlanes = () => {
  const [activeTab, setActiveTab] = useState('esencial');
  const [isComparing, setIsComparing] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);


  const generarCodigoReferencia = () => {
    const letras = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    while (!codigo.includes('IT')) {
      codigo = '';
      for (let i = 0; i < 6; i++) {
        codigo += letras.charAt(Math.floor(Math.random() * letras.length));
      }
      const posicion = Math.floor(Math.random() * (codigo.length - 1));
      codigo = codigo.slice(0, posicion) + 'IT' + codigo.slice(posicion);
    }
    return codigo;
  };
  
  const [codigoReferencia] = useState(() => {
    try {
      const raw = localStorage.getItem('codigoInterconecta');
      const parsed = raw ? JSON.parse(raw) : null;
      const expiracionMs = 21 * 24 * 60 * 60 * 1000; // 21 días
      const ahora = Date.now();
  
      if (
        parsed &&
        typeof parsed.codigo === 'string' &&
        typeof parsed.timestamp === 'number' &&
        ahora - parsed.timestamp < expiracionMs
      ) {
        return parsed.codigo;
      }
    } catch (err) {
      console.warn('Error al cargar código desde localStorage:', err);
    }
  
    const nuevo = generarCodigoReferencia();
    localStorage.setItem('codigoInterconecta', JSON.stringify({
      codigo: nuevo,
      timestamp: Date.now()
    }));
    return nuevo;
  });
  
  const mensajeCompartir = `https://www.interconecta.capital/\n\nÚnete a Interconecta con mi código ${codigoReferencia} y recibe 10% de descuento en tu setup inicial`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(mensajeCompartir);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };
  // Animaciones para elementos que aparecen
  
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Animaciones para la tabla comparativa
  const tableAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const rowAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  // Información de los planes
  const planesInfo = {
    esencial: {
      nombre: "Consultorio Esencial",
      precio: "$890",
      setup: "$2,900",
      color: "#1A69FA",
      bgColor: "rgba(26, 105, 250, 0.1)",
      descripcion: "Automatización básica ideal para consultorios que inician su transformación digital",
      solucion: "Libera hasta 40 horas mensuales en tareas administrativas y de seguimiento",
      icono: "🏥",
      caracteristicas: [
        "Asistente virtual básico por WhatsApp (24/7)",
        "Agendamiento automático y recordatorios",
        "Formulario para captura de nuevos pacientes",
        "Integración con Google Calendar",
        "Recordatorios automáticos de citas",
        "Panel básico de pacientes registrados"
      ]
    },
    pro: {
      nombre: "Consultorio Pro",
      precio: "$1,490",
      setup: "$3,900",
      color: "#2E9D4C",
      bgColor: "rgba(46, 157, 76, 0.1)",
      descripcion: "Solución integral para consultorios con volumen medio de pacientes",
      solucion: "Libera hasta 60 horas mensuales y aumenta conversión de pacientes en 35%",
      icono: "⚕️",
      caracteristicas: [
        "Todo lo del plan Esencial",
        "Asistente con IA especializada en salud",
        "Panel de control con 5 dashboards en tiempo real",
        "Seguimiento post-consulta automatizado",
        "Mensajes personalizados según tipo de paciente",
        "Integración con sistema de pagos",
        "Reportes semanales automáticos"
      ]
    },
    premium: {
      nombre: "Consultorio Premium",
      precio: "$2,490",
      setup: "$5,900",
      color: "#E23838",
      bgColor: "rgba(226, 56, 56, 0.1)",
      descripcion: "Automatización avanzada para consultorios de alto rendimiento",
      solucion: "Libera +80 horas mensuales y potencia crecimiento con marketing automatizado",
      icono: "🏆",
      caracteristicas: [
        "Todo lo del plan Pro",
        "IA personalizada con entrenamiento específico",
        "Panel maestro con 10+ dashboards avanzados",
        "Campañas automatizadas de marketing",
        "Cotizaciones automáticas según historial",
        "Integraciones avanzadas (ERP, facturación)",
        "Análisis predictivo de pacientes",
        "Soporte prioritario"
      ]
    }
  };

  // Información de los dashboards
  const dashboardsInfo = {
    esencial: {
      titulo: "Acceso Básico a Datos",
      descripcion: "Visualización en formato de tabla simple",
      dashboards: [
        "🧾 Tabla de pacientes registrados",
        "🕑 Historial de citas agendadas y canceladas",
        "📋 Registro de servicios solicitados (sin visualización gráfica)"
      ],
      nota: "Disponible en NocoDB como tabla editable"
    },
    pro: {
      titulo: "Dashboards en Tiempo Real",
      descripcion: "Visualización gráfica y analítica básica",
      dashboards: [
        "🧍‍♂️ Nuevos Pacientes Registrados (filtros por fecha y servicio)",
        "📆 Citas Agendadas y Canceladas (tasa de cancelación semanal)",
        "🧠 Chatbots Iniciados vs. Abandonados (% de abandono)",
        "💵 Cotizaciones Solicitadas (comparativa por servicio)",
        "💬 Servicios más Solicitados (top 5 en gráfico de barras)"
      ]
    },
    premium: {
      titulo: "Dashboards Avanzados",
      descripcion: "Analítica avanzada y personalizable",
      dashboards: [
        "📈 Ingresos Proyectados (por servicio, semana y canal)",
        "🕒 Horarios Pico (mapa de calor de días/horas)",
        "🔁 Clientes Recurrentes (retención mensual)",
        "🧾 Productividad Operativa (horas ahorradas)",
        "🧪 Panel Maestro Personalizable (vistas combinadas)"
      ],
      nota: "Incluye todos los dashboards del plan Pro"
    }
  };

  // Información sobre integraciones
  const integraciones = [
    { nombre: "Google Calendar", logo: "/assets/images/calendar_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "WhatsApp Business", logo: "/assets/images/whatsappb_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Google Drive", logo: "/assets/images/drive_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Mercado Pago", logo: "/assets/images/mercadopago_logo.png", disponibleEn: [ "premium"] },
    { nombre: "Zoho", logo: "/assets/images/zoho_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Stripe", logo: "/assets/images/stripe_logo.png", disponibleEn: ["premium"] },
    { nombre: "Google Sheets", logo: "/assets/images/sheets_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Zoom", logo: "/assets/images/zoom_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Tally", logo: "/assets/images/tally_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Notion", logo: "/assets/images/notion_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "JIRA", logo: "/assets/images/jira_logo.png", disponibleEn: ["pro","premium"] },
    { nombre: "Vtiger", logo: "/assets/images/vtiger_logo.png", disponibleEn: ["esencial", "pro", "premium"] }
  ];

  // Tabla comparativa
  const comparativaItems = [
    { categoria: "Asistente virtual", esencial: "Básico", pro: "Con IA", premium: "IA Personalizada" },
    { categoria: "Agendamiento automático", esencial: "✅", pro: "✅", premium: "✅" },
    { categoria: "Recordatorios de citas", esencial: "✅", pro: "✅", premium: "✅" },
    { categoria: "Dashboards visuales", esencial: "❌", pro: "5 dashboards", premium: "10+ dashboards" },
    { categoria: "Seguimiento post-consulta", esencial: "Manual", pro: "Automatizado", premium: "Personalizado" },
    { categoria: "Cotizaciones automáticas", esencial: "❌", pro: "Básicas", premium: "Avanzadas" },
    { categoria: "Campañas de marketing", esencial: "❌", pro: "❌", premium: "✅" },
    { categoria: "Integraciones", esencial: "2", pro: "5", premium: "8+" },
    { categoria: "Soporte prioritario", esencial: "❌", pro: "❌", premium: "✅" },
    { categoria: "Tiempo de implementación", esencial: "3 días", pro: "5 días", premium: "7 días" }
  ];

  // Certificaciones de seguridad
  const certificaciones = [
    { nombre: "HIPAA", descripcion: "Estándar de privacidad para información de salud", icono: "🔐" },
    { nombre: "LGPD", descripcion: "Ley General de Protección de Datos", icono: "🛡️" },
    { nombre: "NOM-004-SSA3", descripcion: "Norma Oficial Mexicana para expediente clínico", icono: "📋" },
    { nombre: "AES-256", descripcion: "Cifrado avanzado para todos los datos", icono: "🔒" }
  ];

  const toggleComparativa = () => {
    setIsComparing(!isComparing);
  };

  const PlanCard = ({ plan, info }) => (
    <motion.div 
      className={`plan-card ${plan}`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      style={{borderColor: info.color, backgroundColor: 'white'}}
    >
      <div className="plan-header" style={{backgroundColor: info.bgColor}}>
        <div className="plan-icon">{info.icono}</div>
        <h3>{info.nombre}</h3>
        <p className="plan-description">{info.descripcion}</p>
      </div>
      <div className="plan-pricing">
        <span className="plan-price">{info.precio}</span>
        <span className="plan-period"> MXN/mes + I.V.A.</span>
        <p className="setup-fee">Setup único: {info.setup} MXN + I.V.A.</p>
      </div>
      <div className="plan-benefits">
        <p className="value-prop" style={{color: info.color}}>{info.solucion}</p>
        <ul className="features-list">
          {info.caracteristicas.map((feature, index) => (
            <li key={index}>
              <span className="check-icon" style={{color: info.color}}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a 
        href={`https://wa.me/+525523686023?text=Hola,%20me%20interesa%20el%20plan%20${info.nombre}%20para%20mi%20consultorio`} 
        className="cta-button" 
        style={{backgroundColor: info.color}}
      >
        Agendar Diagnóstico
      </a>
    </motion.div>
  );

  return (
    <div className="planes-consultorios-container">
      <motion.div 
  className="hero-section"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="hero-title-wrapper">
    <span className="hero-icon-pulse">📈</span>
    <h1>Planes de Automatización</h1>
    <span className="hero-icon-pulse">⚙️</span>
  </div>
  <p>
    Soluciones inteligentes para consultorios que quieren escalar sin contratar más personal.<br />
    <strong style={{ color: 'var(--primary-color)' }}>
      Optimiza, automatiza y transforma con tecnología de élite.
    </strong>
  </p>
</motion.div>

      <div className="tabs-container">
        <div className="plan-tabs">
          {Object.keys(planesInfo).map(plan => (
            <button 
              key={plan} 
              className={`tab ${activeTab === plan ? 'active' : ''}`} 
              onClick={() => setActiveTab(plan)}
              style={activeTab === plan ? {borderColor: planesInfo[plan].color} : {}}
            >
              {planesInfo[plan].nombre}
            </button>
          ))}
        </div>
        <button 
          className={`compare-button ${isComparing ? 'active' : ''}`} 
          onClick={toggleComparativa}
        >
          {isComparing ? 'Ver Detalles' : 'Comparar Planes'}
        </button>
      </div>

      {!isComparing ? (
        <div className="plans-container">
          <PlanCard plan={activeTab} info={planesInfo[activeTab]} />
          
          <motion.div 
            className="dashboard-section"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h2>Dashboards Incluidos</h2>
            <div className="dashboard-container" style={{borderColor: planesInfo[activeTab].color}}>
              <h3 style={{color: planesInfo[activeTab].color}}>{dashboardsInfo[activeTab].titulo}</h3>
              <p>{dashboardsInfo[activeTab].descripcion}</p>
              <ul className="dashboard-list">
                {dashboardsInfo[activeTab].dashboards.map((dashboard, index) => (
                  <li key={index}>{dashboard}</li>
                ))}
              </ul>
              {dashboardsInfo[activeTab].nota && (
                <p className="dashboard-note">{dashboardsInfo[activeTab].nota}</p>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="comparison-table-container"
          initial="hidden"
          animate="visible"
          variants={tableAnimation}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Característica</th>
                <th className="esencial-col">Esencial</th>
                <th className="pro-col">Pro</th>
                <th className="premium-col">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparativaItems.map((item, index) => (
                <motion.tr key={index} variants={rowAnimation}>
                  <td>{item.categoria}</td>
                  <td className="esencial-col">{item.esencial}</td>
                  <td className="pro-col">{item.pro}</td>
                  <td className="premium-col">{item.premium}</td>
                </motion.tr>
              ))}
              <motion.tr variants={rowAnimation}>
                <td><strong>Precio Mensual</strong></td>
                <td className="esencial-col"><strong>{planesInfo.esencial.precio} MXN</strong></td>
                <td className="pro-col"><strong>{planesInfo.pro.precio} MXN</strong></td>
                <td className="premium-col"><strong>{planesInfo.premium.precio} MXN</strong></td>
              </motion.tr>
            </tbody>
          </table>
          <p className="comparison-note">Todos los precios son + I.V.A.</p>
        </motion.div>
      )}

      <motion.div 
        className="integration-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Plataformas con las que nos integramos</h2>
        <div className="integration-logos">
          {integraciones.map((integracion, index) => (
            <div key={index} className="integration-logo-wrapper">
              <img src={integracion.logo} alt={integracion.nombre} className="integration-logo" />
              <div className="integration-availability">
                {["esencial", "pro", "premium"].map(plan => (
                  <span 
                    key={plan} 
                    className={`dot ${integracion.disponibleEn.includes(plan) ? plan : 'disabled'}`}
                    title={`${integracion.disponibleEn.includes(plan) ? 'Disponible' : 'No disponible'} en Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
                  ></span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="integration-note">Desarrollamos integraciones personalizadas para tu sistema de gestión específico (consultar precio adicional)</p>
      </motion.div>

      <motion.div 
        className="process-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Proceso de Implementación</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Diagnóstico</h3>
            <p>Analizamos tus procesos actuales y necesidades específicas</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Configuración</h3>
            <p>Implementamos y personalizamos tu solución</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Capacitación</h3>
            <p>Entrenamos a tu equipo en el uso del sistema</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Lanzamiento</h3>
            <p>Activamos tu sistema y monitoreamos el rendimiento</p>
          </div>
        </div>
        <div className="implementation-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <h4>Implementación Rápida</h4>
            <p>De 3 a 7 días según el plan</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📱</span>
            <h4>Conserva tu Número</h4>
            <p>No es necesario cambiar tu WhatsApp actual</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔄</span>
            <h4>Cero Interrupciones</h4>
            <p>Tu consultorio sigue operando normalmente</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="security-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Seguridad y Cumplimiento Normativo</h2>
        <div className="certifications-container">
          {certificaciones.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="certification-icon">{cert.icono}</div>
              <h3>{cert.nombre}</h3>
              <p>{cert.descripcion}</p>
            </div>
          ))}
        </div>
        <p className="security-note">Todos nuestros sistemas operan con cifrado de extremo a extremo y segmentación por cliente</p>
      </motion.div>

      <motion.div 
        className="roi-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Retorno de Inversión Garantizado</h2>
        <div className="roi-cards">
          <div className="roi-card">
            <h3>Tiempo Ahorrado</h3>
            <div className="roi-value">30-50 horas</div>
            <p>mensuales en tareas administrativas</p>
          </div>
          <div className="roi-card">
            <h3>Reducción Cancelaciones</h3>
            <div className="roi-value">60%</div>
            <p>menos cancelaciones de última hora</p>
          </div>
          <div className="roi-card">
            <h3>Aumento Pacientes</h3>
            <div className="roi-value">35%</div>
            <p>más conversiones de consultas a pacientes</p>
          </div>
        </div>
        <div className="roi-calculator">
          <p>Calcula tu ROI específico con nuestra <a href="/calculadora-roi" className="calculator-link">calculadora personalizada</a></p>
        </div>
      </motion.div>

      <motion.div 
        className="referral-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Programa de Referidos</h2>
        <div className="referral-container">
          <div className="referral-info">
            <h3>Recibe bonificaciones por cada referido</h3>
            <p>Por cada consultorio o clínica que contrate nuestros servicios por tu recomendación:</p>
            <ul>
              <li>Recibes 1 mes gratis de tu suscripción</li>
              <li>Tu referido obtiene 10% de descuento en su setup inicial</li>
              <li>Sin límite de referidos</li>
            </ul>
          </div>
          <div className="referral-cta">
            <button
              type="button"
              className="button secondary-button"
              onClick={(e) => {
                e.preventDefault();
                setModalAbierto(true);
              }}
            >
              Referir Ahora
            </button>
          </div>
        </div>

        {modalAbierto && (
  <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h3>Comparte tu Código</h3>
      <p><strong>{codigoReferencia}</strong></p>
      <p className="share-text">{mensajeCompartir}</p>
      <div className="share-buttons">
      {copiado ? (
  <div className="copied-confirmation">✅ ¡Copiado!</div>
) : (
  <button type="button" onClick={handleCopy}>📋 Copiar Mensaje</button>
)}        <a
          href={`https://wa.me/?text=${encodeURIComponent(mensajeCompartir)}`}
          target="_blank"
          rel="noopener noreferrer"
        >🟢 WhatsApp</a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(mensajeCompartir)}`}
          target="_blank"
          rel="noopener noreferrer"
        >📢 Telegram</a>
      </div>
      <button
        type="button"
        className="button close-button"
        onClick={(e) => {
          e.preventDefault();
          setModalAbierto(false);
        }}
      >
        Cerrar
      </button>
    </div>
  </div>
)}
      </motion.div>

      <motion.div 
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>¿Listo para transformar tu consultorio?</h2>
        <p>Agenda un diagnóstico gratuito y descubre cómo Interconecta Capital puede optimizar tu operación</p>
        <div className="cta-buttons">
          <a href="https://wa.me/+525519686023?text=Hola,%20me%20interesa%20una%20demo%20para%20mi%20consultorio" className="button primary-button">
            <span className="button-icon">💬</span> Contactar por WhatsApp
          </a>
          <a href="/Reuniones" className="button secondary-button">
            <span className="button-icon">📋</span> Solicitar Diagnóstico
          </a>
        </div>
      </motion.div>

      <motion.div 
        className="faq-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>¿Necesito cambiar mi número de WhatsApp actual?</h3>
            <p>No, nos integramos con tu número existente mediante la API oficial de WhatsApp Business.</p>
          </div>
          <div className="faq-item">
            <h3>¿Cuánto tiempo toma la implementación?</h3>
            <p>De 3 a 7 días hábiles dependiendo del plan seleccionado y la complejidad de tu operación.</p>
          </div>
          <div className="faq-item">
            <h3>¿Puedo personalizar las automatizaciones?</h3>
            <p>Sí, todas nuestras soluciones se adaptan a tus procesos específicos, y ofrecemos desarrollos a medida con costo adicional.</p>
          </div>
          <div className="faq-item">
            <h3>¿Cómo garantizan la seguridad de la información?</h3>
            <p>Utilizamos cifrado AES-256, segmentación por cliente y cumplimos con normativas HIPAA, LGPD y NOM-004-SSA3.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultoriosPlanes;