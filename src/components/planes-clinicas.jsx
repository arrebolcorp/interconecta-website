import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/planes-clinicas.css';

const ClinicasPlanes = () => {
  const [activeTab, setActiveTab] = useState('impulso');
  const [isComparing, setIsComparing] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const generarCodigoReferencia = () => {
    const letras = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    while (!codigo.includes('IC')) {
      codigo = '';
      for (let i = 0; i < 6; i++) {
        codigo += letras.charAt(Math.floor(Math.random() * letras.length));
      }
      const posicion = Math.floor(Math.random() * (codigo.length - 1));
      codigo = codigo.slice(0, posicion) + 'IC' + codigo.slice(posicion);
    }
    return codigo;
  };
  
  const [codigoReferencia] = useState(() => {
    try {
      const raw = localStorage.getItem('codigoInterconectaClinicas');
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
    localStorage.setItem('codigoInterconectaClinicas', JSON.stringify({
      codigo: nuevo,
      timestamp: Date.now()
    }));
    return nuevo;
  });
  
  const mensajeCompartir = `https://www.interconecta.capital/planes-clinicas\n\n¡Transforma tu clínica médica con IA especializada!\nÚnete con mi código ${codigoReferencia} y recibe 15% descuento en setup inicial`;
  
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

  // Información actualizada de los planes para clínicas
  const planesInfo = {
    impulso: {
      nombre: "Impulso Plus Clínica",
      precio: "$3,500",
      setup: "Incluido",
      originalSetup: "$7,800",
      color: "#1A69FA",
      bgColor: "rgba(26, 105, 250, 0.1)",
      descripcion: "Chief AI Officer fraccional para clínicas pequeñas: automatización inteligente coordinada entre especialidades",
      solucion: "Coordina hasta 5 especialistas perfectamente y libera 60 horas mensuales del equipo médico",
      icono: "🏥",
      badge: "Clínicas 2-5 Médicos",
      especialistas: "Hasta 5 especialidades",
      caracteristicas: [
        "🤖 Centro de derivaciones inteligente entre especialistas",
        "📅 Agendamiento coordinado multi-especialidad automático", 
        "👥 Dashboard unificado para dirección médica",
        "📋 Formularios específicos por especialidad médica",
        "🔗 Integración perfecta con sistemas médicos existentes",
        "⏰ Recordatorios y seguimientos personalizados por especialidad",
        "📊 Reportes consolidados de todas las especialidades",
        "💬 IA médica entrenada en protocolos de derivación clínica"
      ]
    },
    crecimiento: {
      nombre: "Crecimiento Plus Clínica",
      precio: "$6,000",
      setup: "Incluido",
      originalSetup: "$14,400",
      color: "#2E9D4C",
      bgColor: "rgba(46, 157, 76, 0.1)",
      descripcion: "Chief AI Officer avanzado para clínicas medianas: automatización integral con IA especializada por área médica",
      solucion: "Gestiona hasta 10 especialistas con IA personalizada y aumenta eficiencia operativa en 70%",
      icono: "🏨",
      badge: "Clínicas 6-10 Médicos",
      especialistas: "Hasta 10 especialidades",
      caracteristicas: [
        "✅ Todo lo del plan Impulso Plus",
        "🧠 IA especializada entrenada por cada área médica específica",
        "📈 Dashboard ejecutivo con 15+ métricas médicas en tiempo real",
        "🔄 Sistema avanzado de gestión de lista de espera coordinada",
        "💊 Seguimientos post-consulta automatizados por especialidad",
        "💳 Facturación automática coordinada entre especialistas",
        "📊 Análisis de rentabilidad por especialidad y médico",
        "🎯 Captación automatizada de pacientes para cada especialidad",
        "🔗 Integraciones avanzadas con EMR y sistemas médicos",
        "⚡ Soporte prioritario con respuesta <4h"
      ]
    },
    dominio: {
      nombre: "Dominio Plus Clínica",
      precio: "$12,000",
      setup: "Incluido",
      originalSetup: "$28,800",
      color: "#E23838",
      bgColor: "rgba(226, 56, 56, 0.1)",
      descripcion: "Chief AI Officer de élite para clínicas grandes: automatización enterprise con IA predictiva y analítica avanzada",
      solucion: "Gestiona especialidades ilimitadas con IA predictiva y potencia crecimiento con marketing médico automatizado",
      icono: "🏛️",
      badge: "Clínicas 11+ Médicos",
      especialistas: "Especialidades ilimitadas",
      caracteristicas: [
        "✅ Todo lo del plan Crecimiento Plus",
        "🎯 IA predictiva personalizada entrenada en protocolos de tu clínica",
        "📊 Torre de control médico con 25+ dashboards ejecutivos",
        "🚀 Marketing médico automatizado por especialidad",
        "💰 Cotizaciones inteligentes con pricing dinámico por especialidad",
        "🔗 Integraciones enterprise (HIS, ERP, sistemas contables)",
        "🔮 Análisis predictivo de demanda por especialidad",
        "📈 Optimización automática de recursos y equipamiento",
        "👨‍💼 Gerente de cuenta dedicado para tu clínica",
        "⚡ Soporte VIP 24/7 con respuesta <2h",
        "🎓 Capacitación continua para todo el equipo médico",
        "📋 Desarrollo a medida según necesidades específicas"
      ]
    }
  };

  // ROI actualizado con datos de clínicas reales
  const roiData = [
    { title: "Coordinación Perfecta", value: "98%", subtitle: "eficiencia en derivaciones entre especialistas", icon: "🎯" },
    { title: "Tiempo Liberado", value: "60-100h", subtitle: "mensuales en coordinación administrativa", icon: "⏱️" },
    { title: "Más Pacientes", value: "65%", subtitle: "aumento en captación coordinada por especialidad", icon: "📈" },
    { title: "ROI Garantizado", value: "500%", subtitle: "retorno promedio clínicas en el primer trimestre", icon: "💰" }
  ];

  // Integraciones actualizadas para clínicas
  const integraciones = [
    { nombre: "WhatsApp Business", logo: "/assets/images/whatsappb_logo.png", disponibleEn: ["impulso", "crecimiento", "dominio"] },
    { nombre: "Google Workspace", logo: "/assets/images/workspace_logo.png", disponibleEn: ["impulso", "crecimiento", "dominio"] },
    { nombre: "Microsoft 365", logo: "/assets/images/office365_logo.png", disponibleEn: ["impulso", "crecimiento", "dominio"] },
    { nombre: "Google Calendar", logo: "/assets/images/calendar_logo.png", disponibleEn: ["impulso", "crecimiento", "dominio"] },
    { nombre: "Calendly", logo: "/assets/images/calendly_logo.png", disponibleEn: ["crecimiento", "dominio"] },
    { nombre: "Zoho CRM", logo: "/assets/images/zoho_logo.png", disponibleEn: ["crecimiento", "dominio"] },
    { nombre: "HubSpot", logo: "/assets/images/hubspot_logo.png", disponibleEn: ["crecimiento", "dominio"] },
    { nombre: "Salesforce", logo: "/assets/images/salesforce_logo.png", disponibleEn: ["dominio"] },
    { nombre: "SAP HealthCare", logo: "/assets/images/sap_logo.png", disponibleEn: ["dominio"] },
    { nombre: "Epic Systems", logo: "/assets/images/epic_logo.png", disponibleEn: ["dominio"] },
    { nombre: "Stripe", logo: "/assets/images/stripe_logo.png", disponibleEn: ["dominio"] },
    { nombre: "QuickBooks", logo: "/assets/images/quickbooks_logo.png", disponibleEn: ["dominio"] }
  ];

  // Tabla comparativa actualizada para clínicas
  const comparativaItems = [
    { categoria: "Centro de derivaciones inteligente", impulso: "✅ Básico", crecimiento: "✅ Avanzado", dominio: "✅ Predictivo" },
    { categoria: "Especialidades soportadas", impulso: "Hasta 5", crecimiento: "Hasta 10", dominio: "Ilimitadas" },
    { categoria: "Dashboard ejecutivo médico", impulso: "Básico unificado", crecimiento: "15+ métricas", dominio: "25+ dashboards" },
    { categoria: "IA especializada por área", impulso: "General médica", crecimiento: "Por especialidad", dominio: "Predictiva personalizada" },
    { categoria: "Marketing médico automatizado", impulso: "❌", crecimiento: "❌", dominio: "✅ Por especialidad" },
    { categoria: "Análisis de rentabilidad", impulso: "Básico", crecimiento: "Por especialidad", dominio: "Predictivo avanzado" },
    { categoria: "Integraciones EMR/HIS", impulso: "4 básicas", crecimiento: "8 avanzadas", dominio: "Enterprise ilimitadas" },
    { categoria: "Cotizaciones inteligentes", impulso: "❌", crecimiento: "Básicas", dominio: "Pricing dinámico" },
    { categoria: "Soporte especializado", impulso: "8x5", crecimiento: "12x6 prioritario", dominio: "VIP 24x7" },
    { categoria: "Gerente dedicado", impulso: "❌", crecimiento: "❌", dominio: "✅ Exclusivo" }
  ];

  // FAQs actualizadas para clínicas
  const faqItems = [
    {
      question: "¿Cómo coordinan las derivaciones entre nuestros especialistas?",
      answer: "Nuestro centro de derivaciones inteligente analiza síntomas, historial y disponibilidad para sugerir automáticamente el especialista ideal. Gestiona la comunicación entre médicos y garantiza seguimiento completo del paciente."
    },
    {
      question: "¿Cuánto tiempo toma implementar en una clínica con múltiples especialidades?",
      answer: "De 7 a 21 días según el plan y número de especialidades. Implementamos por fases para no interrumpir operaciones: primero coordinación básica, luego especialidades una por una."
    },
    {
      question: "¿La IA diferencia entre protocolos de cada especialidad médica?",
      answer: "Sí, entrenamos modelos específicos para cada especialidad de tu clínica (cardiología, ginecología, pediatría, etc.) con sus protocolos, vocabulario y flujos particulares."
    },
    {
      question: "¿Cómo garantizan la seguridad con múltiples especialistas accediendo?",
      answer: "Segmentación por roles y especialidades con acceso controlado. Cada médico ve solo sus pacientes y derivaciones relevantes. Cumplimos HIPAA, LGPD y NOM-004-SSA3 con auditoria completa."
    },
    {
      question: "¿Pueden integrar con nuestro sistema médico (EMR/HIS) actual?",
      answer: "Sí, desarrollamos integraciones con los principales EMR/HIS del mercado. En el plan Dominio incluimos desarrollo de conectores específicos para sistemas propietarios."
    },
    {
      question: "¿Qué pasa si agregamos nuevas especialidades después?",
      answer: "Escalamiento incluido en todos los planes. Agregamos nuevas especialidades entrenando la IA específicamente y configurando flujos sin costo adicional hasta los límites de tu plan."
    }
  ];

  const PlanCard = ({ plan, info, isActive }) => (
    <motion.div 
      className={`plan-card clinicas ${plan} ${isActive ? 'active' : ''}`}
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
        <div className="specialists-info">
          <span className="specialists-count">{info.especialistas}</span>
        </div>
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
        <p className="price-note">+ I.V.A. | Contratos anuales con descuento</p>
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
          href={`https://wa.me/+525519686023?text=Hola,%20somos%20una%20clínica%20médica%20y%20nos%20interesa%20el%20${info.nombre}%20para%20coordinar%20nuestras%20especialidades.%20¿Podemos%20agendar%20diagnóstico%20gratuito?`} 
          className="cta-button clinicas" 
          style={{ backgroundColor: info.color }}
        >
          🏥 Diagnóstico Clínica Gratuito
        </a>
        <p className="cta-subtitle">Implementación en {plan === 'impulso' ? '7' : plan === 'crecimiento' ? '14' : '21'} días</p>
      </div>
    </motion.div>
  );

  return (
    <div className="planes-clinicas-container modern">
      {/* Hero Section Clínicas */}
      <motion.div 
        className="hero-section clinicas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content-wrapper">
          <div className="hero-title-wrapper">
            <span className="hero-icon-pulse">🏥</span>
            <h1>Tu Chief AI Officer para Clínicas Médicas</h1>
            <span className="hero-icon-pulse">🤖</span>
          </div>
          <p className="hero-subtitle">
            Automatización médica enterprise que coordina especialidades perfectamente.<br />
            <strong style={{ color: 'var(--primary-color)' }}>
              Transforma clínicas complejas en operaciones fluidas y rentables.
            </strong>
          </p>
          
          {/* Social Proof Clínicas */}
          <div className="clinicas-social-proof">
            <div className="social-proof-item">
              <span className="proof-number-clinicas">+25</span>
              <span className="proof-text">Clínicas automatizadas</span>
            </div>
            <div className="social-proof-item">
              <span className="proof-number-clinicas">500%</span>
              <span className="proof-text">ROI promedio clínicas</span>
            </div>
            <div className="social-proof-item">
              <span className="proof-number-clinicas">98%</span>
              <span className="proof-text">Coordinación perfecta</span>
            </div>
            <div className="social-proof-item">
              <span className="proof-number-clinicas">21 días</span>
              <span className="proof-text">Implementación máxima</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation mejorada para clínicas */}
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
              <span className="tab-specialists">{planesInfo[plan].especialistas}</span>
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

            {/* Tabla Comparativa para Clínicas */}
            <motion.div 
              className="detailed-comparison"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h3>Comparación Detallada para Clínicas</h3>
              <div className="comparison-table-wrapper">
                <table className="comparison-table clinicas">
                  <thead>
                    <tr>
                      <th>Característica</th>
                      <th className="impulso-col">
                        <div className="plan-header-compact">
                          🏥 Impulso Plus<br />
                          <span className="specialists-compact">2-5 médicos</span><br />
                          <span className="price-compact">$3,500/mes</span>
                        </div>
                      </th>
                      <th className="crecimiento-col">
                        <div className="plan-header-compact">
                          🏨 Crecimiento Plus<br />
                          <span className="specialists-compact">6-10 médicos</span><br />
                          <span className="price-compact">$6,000/mes</span>
                        </div>
                      </th>
                      <th className="dominio-col">
                        <div className="plan-header-compact">
                          🏛️ Dominio Plus<br />
                          <span className="specialists-compact">11+ médicos</span><br />
                          <span className="price-compact">$12,000/mes</span>
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
                        <td className="impulso-col">{item.impulso}</td>
                        <td className="crecimiento-col">{item.crecimiento}</td>
                        <td className="dominio-col">{item.dominio}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Section para Clínicas */}
      <motion.div 
        className="roi-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Resultados Comprobados en Clínicas Médicas</h2>
        <div className="roi-grid">
          {roiData.map((item, index) => (
            <motion.div 
              key={index}
              className="roi-card clinicas"
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
          <p>📊 <a href="/calculadora-roi-clinicas" className="calculator-link">Calcula ROI específico para tu clínica</a> según número de especialidades</p>
        </div>
      </motion.div>

      {/* Especialidades Soportadas */}
      <motion.div 
        className="specialties-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Especialidades Médicas Soportadas</h2>
        <div className="specialties-grid">
          {[
            { name: "Cardiología", icon: "❤️", desc: "Protocolos cardiovasculares automatizados" },
            { name: "Ginecología", icon: "👩‍⚕️", desc: "Seguimiento integral femenino" },
            { name: "Pediatría", icon: "👶", desc: "Protocolos pediátricos especializados" },
            { name: "Dermatología", icon: "🩺", desc: "Tratamientos dermatológicos automatizados" },
            { name: "Ortopedia", icon: "🦴", desc: "Rehabilitación y seguimiento ortopédico" },
            { name: "Oftalmología", icon: "👁️", desc: "Protocolos oftalmológicos completos" },
            { name: "Medicina Interna", icon: "🔬", desc: "Diagnósticos integrales automatizados" },
            { name: "Psiquiatría", icon: "🧠", desc: "Seguimiento mental especializado" },
            { name: "Medicina Familiar", icon: "👨‍👩‍👧‍👦", desc: "Atención familiar integral" },
            { name: "Y más...", icon: "➕", desc: "Adaptamos cualquier especialidad" }
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

      {/* Integraciones para Clínicas */}
      <motion.div 
        className="integration-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Se Integra con Sistemas Médicos Enterprise</h2>
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
                {["impulso", "crecimiento", "dominio"].map(plan => (
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
          🏥 <strong>¿Usan EMR/HIS específico?</strong> Desarrollamos integraciones a medida para cualquier sistema médico
        </p>
      </motion.div>

      {/* Proceso de Implementación en Clínicas */}
      <motion.div 
        className="process-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Implementación Enterprise sin Interrupcir Operaciones</h2>
        <div className="process-timeline">
          {[
            { step: 1, title: "Auditoría Médica Integral", desc: "Analizamos flujos entre especialidades y protocolos actuales", icon: "🔍" },
            { step: 2, title: "Configuración por Especialidad", desc: "Personalizamos IA para cada área médica específica", icon: "⚙️" },
            { step: 3, title: "Implementación Gradual", desc: "Activamos por especialidades sin afectar operaciones", icon: "🔄" },
            { step: 4, title: "Capacitación Especializada", desc: "Entrenamos a cada equipo médico en su área específica", icon: "🎓" },
            { step: 5, title: "Optimización Continua", desc: "Monitoreamos y mejoramos coordinación entre especialidades", icon: "📈" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="process-step clinicas"
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
            <h4>Implementación por Fases</h4>
            <p>7-21 días según especialidades</p>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">🏥</span>
            <h4>Cero Interrupciones</h4>
            <p>Tu clínica opera normalmente</p>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">👨‍⚕️</span>
            <h4>Capacitación Especializada</h4>
            <p>Por área médica específica</p>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">📊</span>
            <h4>Métricas Inmediatas</h4>
            <p>Resultados visibles desde día 1</p>
          </div>
        </div>
      </motion.div>

      {/* Casos de Éxito de Clínicas */}
      <motion.div 
        className="success-cases-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Casos de Éxito en Clínicas Reales</h2>
        <div className="success-cases-grid">
          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="case-header">
              <h3>🏥 Clínica Integral Guadalajara</h3>
              <span className="case-type">6 especialidades coordinadas</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">85%</span>
                <span className="metric-label">Reducción tiempo coordinación</span>
              </div>
              <div className="metric">
                <span className="metric-value">60%</span>
                <span className="metric-label">Más derivaciones exitosas</span>
              </div>
            </div>
            <p className="case-quote">
              "La coordinación entre nuestros 6 especialistas ahora es perfecta. 
              Los pacientes fluyen sin problemas y hemos aumentado 40% la rentabilidad."
            </p>
            <span className="case-author">- Dr. Martinez, Director Médico</span>
          </motion.div>

          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="case-header">
              <h3>🏨 Centro Médico CDMX</h3>
              <span className="case-type">12 especialidades enterprise</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">70h</span>
                <span className="metric-label">Ahorradas semanalmente</span>
              </div>
              <div className="metric">
                <span className="metric-value">90%</span>
                <span className="metric-label">Satisfacción pacientes</span>
              </div>
            </div>
            <p className="case-quote">
              "Transformamos completamente la experiencia del paciente. 
              La IA coordina todo perfectamente y podemos atender 50% más pacientes."
            </p>
            <span className="case-author">- Dra. Lopez, Directora General</span>
          </motion.div>

          <motion.div 
            className="success-case"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="case-header">
              <h3>🏛️ Hospital Privado Monterrey</h3>
              <span className="case-type">15+ especialidades coordinadas</span>
            </div>
            <div className="case-metrics">
              <div className="metric">
                <span className="metric-value">$2.5M</span>
                <span className="metric-label">Aumento ingresos anuales</span>
              </div>
              <div className="metric">
                <span className="metric-value">95%</span>
                <span className="metric-label">Eficiencia operativa</span>
              </div>
            </div>
            <p className="case-quote">
              "El ROI fue inmediato. En 6 meses recuperamos la inversión y ahora 
              operamos como una clínica del futuro."
            </p>
            <span className="case-author">- Dr. Hernandez, CEO</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Seguridad y Cumplimiento para Clínicas */}
      <motion.div 
        className="security-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Seguridad Enterprise para Clínicas</h2>
        <div className="security-grid">
          <div className="security-card">
            <div className="security-icon">🔐</div>
            <h3>HIPAA Certified</h3>
            <p>Protección total información médica</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🛡️</div>
            <h3>LGPD Compliant</h3>
            <p>Cumplimiento normativo mexicano</p>
          </div>
          <div className="security-card">
            <div className="security-icon">📋</div>
            <h3>NOM-004-SSA3</h3>
            <p>Expediente clínico certificado</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🏥</div>
            <h3>SOC 2 Type II</h3>
            <p>Auditoria seguridad enterprise</p>
          </div>
          <div className="security-card">
            <div className="security-icon">🔒</div>
            <h3>AES-256</h3>
            <p>Cifrado militar para datos</p>
          </div>
          <div className="security-card">
            <div className="security-icon">👥</div>
            <h3>Role-Based Access</h3>
            <p>Acceso por especialidad y rol</p>
          </div>
        </div>
        <p className="security-note">
          🏥 <strong>Especialistas en seguridad médica enterprise:</strong> Segmentación total por especialidad con auditoria completa de accesos
        </p>
      </motion.div>

      {/* Programa de Referidos para Clínicas */}
      <motion.div 
        className="referral-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Programa de Referidos entre Clínicas</h2>
        <div className="referral-container">
          <div className="referral-info">
            <h3>🏥 Refiere otras clínicas médicas y obtén beneficios</h3>
            <div className="referral-benefits">
              <div className="benefit">
                <span className="benefit-icon">🎁</span>
                <div className="benefit-text">
                  <strong>2 meses gratis</strong> por cada clínica referida que contrate
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">💰</span>
                <div className="benefit-text">
                  <strong>15% descuento</strong> en setup para clínica referida
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🤝</span>
                <div className="benefit-text">
                  <strong>Red de clínicas</strong> para intercambio de especialistas
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
              🏥 Referir Clínica Médica
            </button>
          </div>
        </div>

        {/* Modal de Referidos para Clínicas */}
        {modalAbierto && (
          <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
            <motion.div 
              className="modal-box clinicas" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3>🏥 Comparte con Otras Clínicas</h3>
              <div className="referral-code">
                <span className="code-label">Tu código de clínica:</span>
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

      {/* FAQ Section para Clínicas */}
      <motion.div 
        className="faq-section clinicas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2>Preguntas Frecuentes de Clínicas</h2>
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

      {/* CTA Final para Clínicas */}
      <motion.div 
        className="cta-section clinicas-final"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="cta-content">
          <h2>🏥 ¿Lista para Transformar tu Clínica Médica?</h2>
          <p className="cta-description">
            Únete a +25 clínicas que ya coordinan especialidades perfectamente y multiplicaron su rentabilidad
          </p>
          
          <div className="cta-stats">
            <div className="stat">
              <span className="stat-number-blanco">21 días</span>
              <span className="stat-label-blanco">Implementación máxima</span>
            </div>
            <div className="stat">
              <span className="stat-number-blanco">500%</span>
              <span className="stat-label-blanco">ROI promedio clínicas</span>
            </div>
            <div className="stat">
              <span className="stat-number-blanco">24/7</span>
              <span className="stat-label-blanco">Coordinación automática</span>
            </div>
            <div className="stat">
              <span className="stat-number-blanco">98%</span>
              <span className="stat-label-blanco">Eficiencia especialidades</span>
            </div>
          </div>

          <div className="cta-buttons-final">
            <a 
              href="https://wa.me/+525519686023?text=Hola,%20somos%20una%20clínica%20médica%20y%20queremos%20automatizar%20la%20coordinación%20entre%20nuestras%20especialidades%20con%20IA.%20¿Podemos%20agendar%20diagnóstico%20gratuito?" 
              className="button primary-final"
            >
              <span className="button-icon">🏥</span> 
              Diagnóstico Clínica Gratuito
            </a>
            <a 
              href="/Reuniones-clinicas" 
              className="button secondary-final"
            >
              <span className="button-icon">📋</span> 
              Agendar Auditoría Operariva
            </a>
          </div>

          <p className="cta-guarantee">
            ✅ <strong>Garantía Enterprise:</strong> Si no mejoras mínimo 60% la coordinación entre especialidades, te devolvemos el dinero
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ClinicasPlanes;