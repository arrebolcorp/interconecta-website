import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/planes-consultorios.css';

const ConsultoriosPlanes = () => {
  const [activeTab, setActiveTab] = useState('esencial');
  const [isComparing, setIsComparing] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

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
  
  const mensajeCompartir = `https://www.interconecta.capital/\n\n¡Transforma tu consultorio médico con IA!\nÚnete con mi código ${codigoReferencia} y recibe 10% descuento en setup inicial`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(mensajeCompartir);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Animaciones mejoradas
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Información actualizada de los planes para AI Partner médico
  const planesInfo = {
    esencial: {
      nombre: "Consultorio Esencial Plus",
      precio: "$1,500",
      setup: "Incluido",
      originalSetup: "$4,200",
      color: "#1A69FA",
      bgColor: "rgba(26, 105, 250, 0.1)",
      descripcion: "Tu primer AI Partner médico: automatización básica inteligente para consultorios en transformación digital",
      solucion: "Libera hasta 40 horas mensuales y nunca más pierdas un paciente por respuesta lenta",
      icono: "🏥",
      badge: "Más Popular",
      caracteristicas: [
        "🤖 Asistente virtual médico IA 24/7 especializado",
        "📅 Agendamiento automático inteligente + confirmaciones",
        "📋 Formularios médicos personalizados por especialidad",
        "🔗 Integración perfecta con Google Calendar médico",
        "⏰ Recordatorios pre/post consulta automatizados",
        "📊 Panel básico de seguimiento de pacientes",
        "💬 Respuestas automáticas a consultas frecuentes médicas"
      ]
    },
    pro: {
      nombre: "Consultorio Pro Plus",
      precio: "$2,500",
      setup: "Incluido",
      originalSetup: "$7,800",
      color: "#2E9D4C",
      bgColor: "rgba(46, 157, 76, 0.1)",
      descripcion: "AI Partner médico avanzado: solución integral para consultorios con volumen medio-alto de pacientes",
      solucion: "Libera hasta 60 horas mensuales y aumenta conversión de pacientes en 45%",
      icono: "⚕️",
      badge: "Recomendado",
      caracteristicas: [
        "✅ Todo lo del plan Esencial Plus",
        "🧠 IA médica especializada con entrenamiento en tu especialidad",
        "📈 Dashboard profesional con 5 métricas médicas en tiempo real",
        "🔄 Seguimiento post-consulta automatizado personalizado",
        "💊 Mensajes específicos según tipo de tratamiento/paciente",
        "💳 Integración con sistemas de pago médico",
        "📊 Reportes semanales automáticos de rendimiento",
        "🎯 Captación automática de pacientes inactivos"
      ]
    },
    premium: {
      nombre: "Consultorio Premium Plus",
      precio: "$4,000",
      setup: "Incluido",
      originalSetup: "$14,400",
      color: "#E23838",
      bgColor: "rgba(226, 56, 56, 0.1)",
      descripcion: "Chief AI Officer médico fraccional: automatización de élite para consultorios de alto rendimiento",
      solucion: "Libera +80 horas mensuales y potencia crecimiento con marketing médico automatizado",
      icono: "🏆",
      badge: "Elite",
      caracteristicas: [
        "✅ Todo lo del plan Pro Plus",
        "🎯 IA personalizada entrenada específicamente en tu consulta",
        "📊 Panel maestro con 10+ dashboards médicos avanzados",
        "🚀 Campañas automatizadas de marketing médico",
        "💰 Cotizaciones automáticas inteligentes según historial",
        "🔗 Integraciones avanzadas (ERP médico, facturación)",
        "🔮 Análisis predictivo de comportamiento de pacientes",
        "⚡ Soporte prioritario VIP con respuesta <2h"
      ]
    }
  };

  // ROI actualizado con datos médicos reales
  const roiData = [
    { title: "Tiempo Ahorrado", value: "40-80h", subtitle: "mensuales en tareas administrativas médicas", icon: "⏱️" },
    { title: "Menos Cancelaciones", value: "65%", subtitle: "reducción en cancelaciones de última hora", icon: "📉" },
    { title: "Más Pacientes", value: "45%", subtitle: "aumento en conversión de consultas médicas", icon: "📈" },
    { title: "ROI Garantizado", value: "400%", subtitle: "retorno promedio en el primer mes", icon: "💰" }
  ];

  // Integraciones actualizadas
  const integraciones = [
    { nombre: "WhatsApp Business", logo: "/assets/images/whatsappb_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Google Calendar", logo: "/assets/images/calendar_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Google Sheets", logo: "/assets/images/sheets_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Notion", logo: "/assets/images/notion_logo.png", disponibleEn: ["esencial", "pro", "premium"] },
    { nombre: "Zoho CRM", logo: "/assets/images/zoho_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Google Drive", logo: "/assets/images/drive_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Zoom", logo: "/assets/images/zoom_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Tally Forms", logo: "/assets/images/tally_logo.png", disponibleEn: ["pro", "premium"] },
    { nombre: "Stripe", logo: "/assets/images/stripe_logo.png", disponibleEn: ["premium"] },
    { nombre: "MercadoPago", logo: "/assets/images/mercadopago_logo.png", disponibleEn: ["premium"] },
    { nombre: "JIRA", logo: "/assets/images/jira_logo.png", disponibleEn: ["premium"] },
    { nombre: "Vtiger", logo: "/assets/images/vtiger_logo.png", disponibleEn: ["premium"] }
  ];

  // Tabla comparativa actualizada
  const comparativaItems = [
    { categoria: "Asistente virtual médico IA", esencial: "Básico especializado", pro: "Avanzado por especialidad", premium: "Personalizado totalmente" },
    { categoria: "Agendamiento automático", esencial: "✅", pro: "✅ + Inteligente", premium: "✅ + Predictivo" },
    { categoria: "Recordatorios médicos", esencial: "✅ Básicos", pro: "✅ Personalizados", premium: "✅ Predictivos" },
    { categoria: "Dashboards médicos", esencial: "Panel básico", pro: "5 dashboards", premium: "10+ dashboards" },
    { categoria: "Seguimiento post-consulta", esencial: "Manual", pro: "Automatizado", premium: "IA personalizada" },
    { categoria: "Cotizaciones automáticas", esencial: "❌", pro: "Básicas", premium: "IA inteligentes" },
    { categoria: "Marketing médico automatizado", esencial: "❌", pro: "❌", premium: "✅ Completo" },
    { categoria: "Integraciones incluidas", esencial: "4 básicas", pro: "8 avanzadas", premium: "12+ elite" },
    { categoria: "Soporte especializado", esencial: "Email/Chat", pro: "Prioritario", premium: "VIP <2h" },
    { categoria: "Implementación", esencial: "3 días", pro: "5 días", premium: "7 días" }
  ];

  // FAQs actualizadas para médicos
  const faqItems = [
    {
      question: "¿Necesito cambiar mi número de WhatsApp médico actual?",
      answer: "No, nos integramos perfectamente con tu WhatsApp Business existente mediante la API oficial. Tu número actual seguirá funcionando normalmente."
    },
    {
      question: "¿Cuánto tiempo toma implementar en mi consultorio?",
      answer: "De 3 a 7 días hábiles según el plan. Trabajamos fuera de tus horarios de consulta para no interrumpir tu operación médica."
    },
    {
      question: "¿La IA entiende mi especialidad médica específica?",
      answer: "Sí, entrenamos la IA con vocabulario y protocolos específicos de tu especialidad médica (dermatología, ginecología, medicina general, etc.)"
    },
    {
      question: "¿Cómo garantizan la seguridad de datos médicos?",
      answer: "Cumplimos HIPAA, LGPD y NOM-004-SSA3. Usamos cifrado AES-256, segmentación por cliente y nunca almacenamos información médica sensible."
    },
    {
      question: "¿Puedo personalizar las automatizaciones médicas?",
      answer: "Totalmente. Adaptamos flujos a tus procesos específicos: tipos de consulta, tratamientos, seguimientos, etc. Desarrollos a medida disponibles."
    },
    {
      question: "¿Qué pasa si tengo dudas durante el uso?",
      answer: "Soporte especializado incluido: Esencial (email/chat), Pro (prioritario), Premium (VIP <2h). Además capacitamos a todo tu equipo."
    }
  ];

  const PlanCard = ({ plan, info, isActive }) => (
    <motion.div 
      className={`plan-card modern ${plan} ${isActive ? 'active' : ''}`}
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      style={{
        borderColor: isActive ? info.color : '#E5E7EB',
        backgroundColor: 'white',
        boxShadow: isActive ? `0 20px 40px ${info.color}30` : '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {info.badge && (
        <div className="plan-badge" style={{ backgroundColor: info.color }}>
          {info.badge}
        </div>
      )}
      
      <div className="plan-header" style={{ backgroundColor: info.bgColor }}>
        <div className="plan-icon">{info.icono}</div>
        <h3>{info.nombre}</h3>
        <p className="plan-description">{info.descripcion}</p>
      </div>

      <div className="plan-pricing">
        <div className="price-container">
          <span className="plan-price">{info.precio}</span>
          <span className="plan-period"> MXN/mes</span>
        </div>
        <div className="setup-info">
          <span className="setup-included">Setup: {info.setup}</span>
          {info.originalSetup && (
            <span className="setup-original">Antes: {info.originalSetup}</span>
          )}
        </div>
        <p className="price-note">+ I.V.A. | Cancela cuando quieras</p>
      </div>

      <div className="plan-benefits">
        <p className="value-prop" style={{ color: info.color }}>
          {info.solucion}
        </p>
        <ul className="features-list">
          {info.caracteristicas.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="plan-cta-section">
        <a 
          href={`https://wa.me/+525519686023?text=Hola,%20soy%20médico%20y%20me%20interesa%20el%20${info.nombre}%20para%20automatizar%20mi%20consultorio.%20¿Podemos%20agendar%20diagnóstico%20gratuito?`} 
          className="cta-button modern" 
          style={{ backgroundColor: info.color }}
        >
          🩺 Diagnóstico Médico Gratuito
        </a>
        <p className="cta-subtitle">Implementación en {plan === 'esencial' ? '3' : plan === 'pro' ? '5' : '7'} días</p>
      </div>
    </motion.div>
  );

  return (
    <div className="planes-consultorios-container modern">
      {/* Hero Section Mejorado */}
      <motion.div 
        className="hero-section medical"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content-wrapper">
          <div className="hero-title-wrapper">
            <span className="hero-icon-pulse">🩺</span>
            <h1>Tu Chief AI Officer Médico Fraccional</h1>
            <span className="hero-icon-pulse">🤖</span>
          </div>
          <p className="hero-subtitle">
            Automatización médica inteligente diseñada específicamente para consultorios.<br />
            <strong style={{ color: 'var(--primary-color)' }}>
              Libera tiempo para tus pacientes, no para tareas administrativas.
            </strong>
          </p>
          
          {/* Social Proof Médico */}
          <div className="medical-social-proof">
            <div className="social-proof-item">
              <span className="proof-number-consultorios">+50</span>
              <span className="proof-text">Médicos automatizados</span>
            </div>
            <div className="social-proof-item">
              <span className="proof-number-consultorios">400%</span>
              <span className="proof-text">ROI promedio primer mes</span>
            </div>
            <div className="social-proof-item">
              <span className="proof-number-consultorios">7 días</span>
              <span className="proof-text">Implementación máxima</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation mejorada */}
      <div className="plans-navigation">
        <div className="nav-tabs">
          {Object.keys(planesInfo).map(plan => (
            <motion.button 
              key={plan} 
              className={`nav-tab ${activeTab === plan ? 'active' : ''}`} 
              onClick={() => setActiveTab(plan)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: activeTab === plan ? planesInfo[plan].color : '#E5E7EB',
                backgroundColor: activeTab === plan ? planesInfo[plan].bgColor : 'white',
                color: activeTab === plan ? planesInfo[plan].color : '#6B7280'
              }}
            >
              <span className="tab-icon">{planesInfo[plan].icono}</span>
              <span className="tab-name">{planesInfo[plan].nombre}</span>
              <span className="tab-price">{planesInfo[plan].precio}/mes</span>
            </motion.button>
          ))}
        </div>
        
        <motion.button 
          className={`compare-toggle ${isComparing ? 'active' : ''}`} 
          onClick={() => setIsComparing(!isComparing)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isComparing ? '👁️ Ver Detalles' : '⚖️ Comparar Planes'}
        </motion.button>
      </div>

      {/* Contenido Principal */}
      <AnimatePresence mode="wait">
        {!isComparing ? (
          <motion.div 
            key="details"
            className="plan-details-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="selected-plan-showcase">
              <PlanCard plan={activeTab} info={planesInfo[activeTab]} isActive={true} />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="comparison"
            className="comparison-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="plans-comparison-grid">
              {Object.entries(planesInfo).map(([plan, info]) => (
                <PlanCard key={plan} plan={plan} info={info} isActive={false} />
              ))}
            </div>

            {/* Tabla Comparativa Mejorada */}
            <motion.div 
              className="detailed-comparison"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h3>Comparación Detallada de Características</h3>
              <div className="comparison-table-wrapper">
                <table className="comparison-table modern">
                  <thead>
                    <tr>
                      <th>Característica</th>
                      <th className="esencial-col">
                        <div className="plan-header-compact">
                          🏥 Esencial Plus<br />
                          <span className="price-compact">$1,500/mes</span>
                        </div>
                      </th>
                      <th className="pro-col">
                        <div className="plan-header-compact">
                          ⚕️ Pro Plus<br />
                          <span className="price-compact">$2,500/mes</span>
                        </div>
                      </th>
                      <th className="premium-col">
                        <div className="plan-header-compact">
                          🏆 Premium Plus<br />
                          <span className="price-compact">$4,000/mes</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativaItems.map((item, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="feature-name">{item.categoria}</td>
                        <td className="esencial-col">{item.esencial}</td>
                        <td className="pro-col">{item.pro}</td>
                        <td className="premium-col">{item.premium}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Section Mejorada */}
      <motion.div 
        className="roi-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Resultados Garantizados para Profesionales de la Salud</h2>
        <div className="roi-grid">
          {roiData.map((item, index) => (
            <motion.div 
              key={index}
              className="roi-card medical"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="roi-icon">{item.icon}</div>
              <div className="roi-value">{item.value}</div>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
        <div className="roi-cta">
          <p>📊 <a href="/calculadora-roi" className="calculator-link">Calcula tu ROI específico</a> según tu tipo de consulta</p>
        </div>
      </motion.div>

      // Agregar estas dos secciones DESPUÉS de la sección ROI y ANTES de la sección de Integraciones en tu archivo planes-consultorios.jsx

      {/* Especialidades de Consultorios Soportadas */}
      <motion.div 
        className="specialties-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Especialidades de Consultorios Soportadas</h2>
        <div className="specialties-grid">
          {[
            { name: "Odontología", icon: "🦷", desc: "Automatización dental completa y seguimientos" },
            { name: "Fisioterapia", icon: "🏃‍♂️", desc: "Rehabilitación y terapias automatizadas" },
            { name: "Dermatología", icon: "🩺", desc: "Tratamientos de piel y estética facial" },
            { name: "Medicina General", icon: "👨‍⚕️", desc: "Consulta general y medicina familiar" },
            { name: "Ginecología", icon: "👩‍⚕️", desc: "Salud femenina integral automatizada" },
            { name: "Psicología", icon: "🧠", desc: "Terapias psicológicas y seguimiento mental" },
            { name: "Nutrición", icon: "🥗", desc: "Planes nutricionales y seguimiento dietético" },
            { name: "Medicina Estética", icon: "✨", desc: "Tratamientos estéticos y anti-aging" },
            { name: "Quiropráctica", icon: "🦴", desc: "Ajustes quiroprácticos y dolor de espalda" },
            { name: "Podología", icon: "🦶", desc: "Cuidado integral de pies y uñas" },
            { name: "Oftalmología", icon: "👁️", desc: "Exámenes visuales y tratamientos oculares" },
            { name: "Y más...", icon: "➕", desc: "Adaptamos cualquier especialidad médica" }
          ].map((specialty, index) => (
            <motion.div 
              key={index}
              className="specialty-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="specialty-icon">{specialty.icon}</div>
              <h4>{specialty.name}</h4>
              <p>{specialty.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Casos de Éxito de Consultorios */}
      <motion.div 
        className="success-cases-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Casos de Éxito en Consultorios Reales</h2>
        <div className="success-cases-grid">
          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="case-header">
              <h3>🦷 Consultorio Dental Guadalajara</h3>
              <span className="case-type">Odontología automatizada</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">80%</span>
                <span className="metric-label">Reducción cancelaciones</span>
              </div>
              <div className="metric">
                <span className="metric-value">50%</span>
                <span className="metric-label">Más citas agendadas</span>
              </div>
            </div>
            <p className="case-quote">
              "Ya no pierdo pacientes por responder tarde. El asistente virtual 
              agenda citas las 24 horas y mis recordatorios son perfectos."
            </p>
            <span className="case-author">- Dr. Rodríguez, Odontólogo</span>
          </motion.div>

          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="case-header">
              <h3>🏃‍♂️ Fisioterapia CDMX</h3>
              <span className="case-type">Rehabilitación inteligente</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">40h</span>
                <span className="metric-label">Ahorradas mensuales</span>
              </div>
              <div className="metric">
                <span className="metric-value">95%</span>
                <span className="metric-label">Adherencia tratamientos</span>
              </div>
            </div>
            <p className="case-quote">
              "Mis pacientes reciben recordatorios de ejercicios automáticamente. 
              La adherencia al tratamiento mejoró increíblemente."
            </p>
            <span className="case-author">- Lic. Carmen López, Fisioterapeuta</span>
          </motion.div>

          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="case-header">
              <h3>✨ Medicina Estética Monterrey</h3>
              <span className="case-type">Consulta estética premium</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">$800K</span>
                <span className="metric-label">Aumento ingresos anuales</span>
              </div>
              <div className="metric">
                <span className="metric-value">70%</span>
                <span className="metric-label">Más consultas mensuales</span>
              </div>
            </div>
            <p className="case-quote">
              "Automatizar mi consultorio estético fue la mejor decisión. 
              Ahora atiendo el doble de pacientes con la misma calidad."
            </p>
            <span className="case-author">- Dra. Ana Martínez, Medicina Estética</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Integraciones Médicas */}
      <motion.div 
        className="integration-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Se Integra con tus Herramientas Médicas</h2>
        <div className="integration-grid">
          {integraciones.map((integracion, index) => (
            <motion.div 
              key={index} 
              className="integration-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={integracion.logo} alt={integracion.nombre} className="integration-logo" />
              <span className="integration-name">{integracion.nombre}</span>
              <div className="integration-availability">
                {["esencial", "pro", "premium"].map(plan => (
                  <span 
                    key={plan} 
                    className={`availability-dot ${integracion.disponibleEn.includes(plan) ? plan : 'disabled'}`}
                    title={`${integracion.disponibleEn.includes(plan) ? 'Incluido' : 'No incluido'} en ${plan}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="integration-note">
          💡 <strong>¿Usas otro sistema médico?</strong> Desarrollamos integraciones personalizadas para EMR, HIS y sistemas específicos
        </p>
      </motion.div>

      {/* Proceso de Implementación */}
      <motion.div 
        className="process-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Implementación sin Interrumpir tu Consulta</h2>
        <div className="process-timeline">
          {[
            { step: 1, title: "Diagnóstico Médico", desc: "Analizamos tu flujo actual de pacientes y necesidades específicas", icon: "🩺" },
            { step: 2, title: "Configuración IA", desc: "Personalizamos la IA para tu especialidad y protocolo médico", icon: "🤖" },
            { step: 3, title: "Capacitación Equipo", desc: "Entrenamos a tu personal en horarios que no afecten consultas", icon: "👩‍⚕️" },
            { step: 4, title: "Lanzamiento", desc: "Activamos gradualmente y monitoreamos rendimiento médico", icon: "🚀" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="process-step medical"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 }}
            >
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <div className="step-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="implementation-guarantees">
          <div className="guarantee-item">
            <span className="guarantee-icon">⚡</span>
            <h4>Implementación Express</h4>
            <p>3-7 días según plan</p>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">📱</span>
            <h4>Sin Cambiar WhatsApp</h4>
            <p>Tu número actual se mantiene</p>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">🔄</span>
            <h4>Cero Interrupciones</h4>
            <p>Tu consulta sigue normal</p>
          </div>
        </div>
      </motion.div>

      {/* Seguridad Médica */}
      <motion.div 
        className="security-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Seguridad Médica Certificada</h2>
        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon">🔐</div>
            <h3>HIPAA</h3>
            <p>Privacidad información médica</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🛡️</div>
            <h3>LGPD</h3>
            <p>Protección datos personales</p>
          </div>
          <div className="security-card">
            <div className="security-icon">📋</div>
            <h3>NOM-004-SSA3</h3>
            <p>Expediente clínico mexicano</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🔒</div>
            <h3>AES-256</h3>
            <p>Cifrado militar para datos</p>
          </div>
        </div>
        <p className="security-note">
          🏥 <strong>Especialistas en seguridad médica:</strong> Cifrado extremo a extremo y segmentación total por consultorio
        </p>
      </motion.div>

      {/* Programa de Referidos Médicos */}
      <motion.div 
        className="referral-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Programa de Referidos entre Médicos</h2>
        <div className="referral-container">
          <div className="referral-info">
            <h3>🩺 Refiere colegas médicos y recibe beneficios</h3>
            <div className="referral-benefits">
              <div className="benefit">
                <span className="benefit-icon">🎁</span>
                <div className="benefit-text">
                  <strong>1 mes gratis</strong> por cada médico referido que contrate
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">💰</span>
                <div className="benefit-text">
                  <strong>10% descuento</strong> en setup para tu colega referido
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">♾️</span>
                <div className="benefit-text">
                  <strong>Sin límite</strong> de referencias médicas
                </div>
              </div>
            </div>
          </div>
          <div className="referral-cta">
            <button
              type="button"
              className="button referral-button"
              onClick={(e) => {
                e.preventDefault();
                setModalAbierto(true);
              }}
            >
              👩‍⚕️ Referir Colega Médico
            </button>
          </div>
        </div>

        {/* Modal de Referidos Mejorado */}
        {modalAbierto && (
          <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
            <motion.div 
              className="modal-box medical" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3>🩺 Comparte con Colegas Médicos</h3>
              <div className="referral-code">
                <span className="code-label">Tu código médico:</span>
                <span className="code-value">{codigoReferencia}</span>
              </div>
              <div className="share-message">
                <p>{mensajeCompartir}</p>
              </div>
              <div className="share-buttons">
                {copiado ? (
                  <div className="copied-confirmation">✅ ¡Mensaje copiado!</div>
                ) : (
                  <button type="button" onClick={handleCopy} className="share-btn copy">
                    📋 Copiar Mensaje
                  </button>
                )}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(mensajeCompartir)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn whatsapp"
                >
                  💬 Compartir por WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(mensajeCompartir)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn telegram"
                >
                  📢 Enviar por Telegram
                </a>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => setModalAbierto(false)}
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* FAQ Section Mejorada */}
      <motion.div 
        className="faq-section medical"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Preguntas Frecuentes de Médicos</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className={`faq-item ${expandedFAQ === index ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="faq-question"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-arrow">{expandedFAQ === index ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {expandedFAQ === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Final Mejorado */}
      <motion.div 
        className="cta-section medical-final"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="cta-content">
          <h2>🩺 ¿Listo para Evolucionar tu Consulta Médica?</h2>
          <p className="cta-description">
            Únete a +50 profesionales de la salud que ya automatizaron sus consultorios y recuperaron tiempo para sus pacientes
          </p>
          
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number-blanco">7 días</span>
              <span className="stat-label-blanco">Implementación máxima</span>
            </div>
            <div className="stat">
              <span className="stat-number-blanco">400%</span>
              <span className="stat-label-blanco">ROI promedio</span>
            </div>
            <div className="stat">
              <span className="stat-number-blanco">24/7</span>
              <span className="stat-label-blanco">Tu IA médica trabajando</span>
            </div>
          </div>

          <div className="cta-buttons-final">
            <a 
              href="https://wa.me/+525519686023?text=Hola,%20soy%20médico%20y%20quiero%20automatizar%20mi%20consultorio%20con%20IA.%20¿Podemos%20agendar%20un%20diagnóstico%20gratuito?" 
              className="button primary-final"
            >
              <span className="button-icon">🩺</span> 
              Diagnóstico Operativo Gratuito
            </a>
            <a 
              href="/Reuniones" 
              className="button secondary-final"
            >
              <span className="button-icon">📋</span> 
              Agendar Reunión
            </a>
          </div>

          <p className="cta-guarantee">
            ✅ <strong>Garantía:</strong> Si no ahorras mínimo 30 horas/mes en tu consultorio, te devolvemos el dinero
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultoriosPlanes;