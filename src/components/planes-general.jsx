import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/planes-general.css';

const PlanesGeneral = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Estadísticas rotativas para generar FOMO
  const rotatingStats = [
    { number: "+75", label: "Médicos automatizados", period: "en 8 meses" },
    { number: "500%", label: "ROI promedio", period: "primer trimestre" },
    { number: "$45M", label: "Ingresos generados", period: "para nuestros clientes" },
    { number: "98%", label: "Satisfacción", period: "NPS score" },
    { number: "24/7", label: "Operación", period: "sin intervención humana" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % rotatingStats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingStats.length]);

  // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="planes-general-container">
      {/* Hero Section con FOMO */}
      <motion.section 
        className="hero-section-general"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="hero-content">
          <div className="fomo-badge">
            <span className="badge-icon">🔥</span>
            <span>+50 médicos se unieron este mes</span>
          </div>
          
          <motion.h1 
            className="hero-title"
            variants={fadeInUp}
          >
            El <span className="gradient-text">Chief AI Officer</span>
            <br />
            que tu Práctica Médica Necesita
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            variants={fadeInUp}
          >
            Mientras otros médicos pierden pacientes por respuestas lentas,
            <br />
            <strong>nuestros clientes operan 24/7 con IA especializada.</strong>
            <br />
            La pregunta no es si necesitas automatización, sino cuánto estás perdiendo sin ella.
          </motion.p>

          {/* Estadística rotativa */}
          <motion.div 
            className="rotating-stat"
            variants={fadeInUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStat}
                className="stat-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="stat-number">{rotatingStats[currentStat].number}</span>
                <span className="stat-label">{rotatingStats[currentStat].label}</span>
                <span className="stat-period">{rotatingStats[currentStat].period}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="cta-buttons-hero"
            variants={staggerContainer}
          >
            <motion.a 
              href="#planes"
              className="button primary-hero"
              variants={slideIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-icon">🚀</span>
              Ver Planes de Automatización
            </motion.a>
            <motion.a 
              href="#historia"
              className="button secondary-hero"
              variants={slideIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-icon">📖</span>
              Conocer Nuestra Historia
            </motion.a>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="hero-pattern"></div>
      </motion.section>

      {/* Urgencia Section */}
      <motion.section 
        className="urgency-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="urgency-content">
          <h2>⚠️ La Ventana de Oportunidad se Cierra</h2>
          <div className="urgency-grid">
            <div className="urgency-card now">
              <h3>🟢 HOY</h3>
              <p><strong>Early Adopters (13.5% del mercado)</strong></p>
              <ul>
                <li>✅ ROI 500%+ garantizado</li>
                <li>✅ Implementación preferencial</li>
                <li>✅ Ventaja competitiva masiva</li>
                <li>✅ Captura pacientes de competencia</li>
              </ul>
            </div>
            <div className="urgency-card soon">
              <h3>🟡 EN 6 MESES</h3>
              <p><strong>Early Majority (34% del mercado)</strong></p>
              <ul>
                <li>⚠️ ROI 200-300%</li>
                <li>⚠️ Mayor competencia</li>
                <li>⚠️ Precios más altos</li>
                <li>⚠️ Tiempos de implementación largos</li>
              </ul>
            </div>
            <div className="urgency-card late">
              <h3>🔴 EN 2 AÑOS</h3>
              <p><strong>Late Majority (34% del mercado)</strong></p>
              <ul>
                <li>❌ Automatización = requisito básico</li>
                <li>❌ Sin ventaja competitiva</li>
                <li>❌ Pacientes esperan IA</li>
                <li>❌ Quedarse atrás = perder práctica</li>
              </ul>
            </div>
          </div>
          <div className="urgency-cta">
            <p>
              <strong>Los primeros 100 médicos obtienen precios de lanzamiento.</strong>
              <br />
              Quedan <span className="countdown">47 espacios</span> disponibles.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Historia de Interconecta */}
      <motion.section 
        id="historia"
        className="history-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="history-content">
          <motion.h2 variants={fadeInUp}>De la Frustración Médica a la Revolución IA</motion.h2>
          
          <div className="timeline">
            <motion.div className="timeline-item" variants={slideIn}>
              <div className="timeline-icon">😤</div>
              <div className="timeline-content">
                <h3>El Problema que Vivimos</h3>
                <p>
                  Como friki de la mejora continua en el sector de la salud, veíamos colegas perder pacientes por <strong>responder WhatsApps a las 2 AM</strong>, 
                  coordinando manualmente entre especialistas, y sacrificando vida personal por tareas administrativas.
                </p>
              </div>
            </motion.div>

            <motion.div className="timeline-item" variants={slideIn}>
              <div className="timeline-icon">💡</div>
              <div className="timeline-content">
                <h3>La Revelación</h3>
                <p>
                  Después de automatizar nuestro primer consultorio y ver <strong>400% de ROI en 30 días</strong>, 
                  entendimos que no era solo tecnología: era <strong>tiempo de vida devuelto a los médicos</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div className="timeline-item" variants={slideIn}>
              <div className="timeline-icon">🚀</div>
              <div className="timeline-content">
                <h3>La Misión</h3>
                <p>
                  Hoy, <strong>+75 médicos recuperaron su vida</strong> mientras sus consultorios operan 24/7. 
                  No vendemos software, <strong>devolvemos tiempo y libertad</strong>.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div className="mission-statement" variants={fadeInUp}>
            <blockquote>
              "Nuestra misión no es solo automatizar consultorios.
              <br />
              Es devolver a los médicos el tiempo que merecen con sus familias
              <br />
              mientras sus pacientes reciben atención de clase mundial 24/7."
              <cite>- Alan Soto, Fundador de Interconecta Capital</cite>
            </blockquote>
          </motion.div>
        </div>
      </motion.section>

      {/* Por qué Nacieron los Planes */}
      <motion.section 
        className="plans-origin-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="origin-content">
          <motion.h2 variants={fadeInUp}>¿Por Qué Existen Nuestros Planes?</motion.h2>
          
          <div className="origin-grid">
            <motion.div className="origin-card problem" variants={slideIn}>
              <h3>❌ Lo que NO Funcionaba</h3>
              <ul>
                <li>Software genérico que no entiende medicina</li>
                <li>Implementaciones de 6+ meses</li>
                <li>Costos ocultos y sorpresas</li>
                <li>Soporte técnico sin conocimiento médico</li>
                <li>Un mismo plan para dentista y ginecólogo</li>
              </ul>
            </motion.div>

            <motion.div className="origin-card solution" variants={slideIn}>
              <h3>✅ Nuestra Solución</h3>
              <ul>
                <li><strong>IA entrenada específicamente</strong> en protocolos médicos</li>
                <li><strong>Implementación en 7 días</strong> sin interrumpir consultas</li>
                <li><strong>Precios transparentes</strong> con setup incluido</li>
                <li><strong>Soporte por médicos</strong> que entienden tu práctica</li>
                <li><strong>Planes por tipo de práctica</strong> y volumen de pacientes</li>
              </ul>
            </motion.div>
          </div>

          <motion.div className="evolution-story" variants={fadeInUp}>
            <h3>La Evolución de Nuestros Planes</h3>
            <div className="evolution-timeline">
              <div className="evolution-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Consultorios Individuales</h4>
                  <p>
                    Empezamos automatizando <strong>médicos independientes</strong> que necesitaban recuperar su tiempo personal.
                  </p>
                </div>
              </div>
              <div className="evolution-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Clínicas Multiespecialidad</h4>
                  <p>
                    Los directores médicos vieron resultados y pidieron <strong>coordinación entre especialistas</strong>.
                  </p>
                </div>
              </div>
              <div className="evolution-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Enterprise Médico</h4>
                  <p>
                    Hospitales privados necesitaban <strong>soluciones enterprise</strong> con gerentes dedicados.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Planes Section */}
      <motion.section 
        id="planes"
        className="plans-selection-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="plans-content">
          <motion.h2 variants={fadeInUp}>Elige Tu Camino hacia la Libertad Médica</motion.h2>
          <motion.p className="plans-subtitle" variants={fadeInUp}>
            Cada plan fue diseñado por médicos, para médicos, basado en años de experiencia automatizando consultorios reales.
          </motion.p>

          <div className="plans-cards">
            <motion.div 
              className="plan-selector-card consultorios"
              variants={slideIn}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="card-header">
                <div className="card-icon">🩺</div>
                <h3>Para Consultorios</h3>
                <p className="card-subtitle">Médicos independientes y consultorios</p>
              </div>
              
              <div className="card-content">
                <div className="target-audience">
                  <h4>Perfecto para:</h4>
                  <ul>
                    <li>👨‍⚕️ Médicos independientes</li>
                    <li>🦷 Dentistas y odontólogos</li>
                    <li>🏃‍♂️ Fisioterapeutas</li>
                    <li>✨ Medicina estética</li>
                    <li>🧠 Psicólogos y terapeutas</li>
                  </ul>
                </div>

                <div className="plan-highlights">
                  <h4>Lo que incluye:</h4>
                  <ul>
                    <li>🤖 Asistente virtual médico 24/7</li>
                    <li>📅 Agendamiento automático inteligente</li>
                    <li>💬 Respuestas automáticas especializadas</li>
                    <li>📊 Dashboard de seguimiento de pacientes</li>
                    <li>⚡ Implementación en 3-7 días</li>
                  </ul>
                </div>

                <div className="roi-preview">
                  <h4>Resultados promedio:</h4>
                  <div className="roi-stats">
                    <span>400% ROI</span>
                    <span>40h ahorradas/mes</span>
                    <span>65% menos cancelaciones</span>
                  </div>
                </div>
              </div>

              <div className="card-cta">
                <a href="/planes-consultorios" className="button consultorios-btn">
                  Ver Planes para Consultorios
                  <span className="button-arrow">→</span>
                </a>
                <p className="pricing-preview">Desde $1,500 MXN/mes</p>
              </div>
            </motion.div>

            <motion.div 
              className="plan-selector-card clinicas"
              variants={slideIn}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="card-header">
                <div className="card-icon">🏥</div>
                <h3>Para Clínicas</h3>
                <p className="card-subtitle">Clínicas multiespecialidad y hospitales</p>
              </div>
              
              <div className="card-content">
                <div className="target-audience">
                  <h4>Perfecto para:</h4>
                  <ul>
                    <li>🏥 Clínicas multiespecialidad</li>
                    <li>🏨 Centros médicos</li>
                    <li>🏛️ Hospitales privados</li>
                    <li>👥 Grupos médicos</li>
                    <li>🌟 Torres médicas</li>
                  </ul>
                </div>

                <div className="plan-highlights">
                  <h4>Lo que incluye:</h4>
                  <ul>
                    <li>🎯 Centro de derivaciones inteligente</li>
                    <li>👥 Coordinación entre especialistas</li>
                    <li>📊 Dashboard ejecutivo unificado</li>
                    <li>🧠 IA especializada por área médica</li>
                    <li>👨‍💼 Gerente de cuenta dedicado</li>
                  </ul>
                </div>

                <div className="roi-preview">
                  <h4>Resultados promedio:</h4>
                  <div className="roi-stats">
                    <span>500% ROI</span>
                    <span>98% coordinación</span>
                    <span>60-100h ahorradas/mes</span>
                  </div>
                </div>
              </div>

              <div className="card-cta">
                <a href="/planes-clinicas" className="button clinicas-btn">
                  Ver Planes para Clínicas
                  <span className="button-arrow">→</span>
                </a>
                <p className="pricing-preview">Desde $3,500 MXN/mes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Social Proof Masivo */}
      <motion.section 
        className="social-proof-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="proof-content">
          <motion.h2 variants={fadeInUp}>+75 Médicos Ya Transformaron Sus Prácticas</motion.h2>
          
          <div className="proof-grid">
            <motion.div className="proof-stat" variants={slideIn}>
              <span className="proof-number">+75</span>
              <span className="proof-label">Médicos automatizados</span>
            </motion.div>
            <motion.div className="proof-stat" variants={slideIn}>
              <span className="proof-number">$45M</span>
              <span className="proof-label">Ingresos adicionales generados</span>
            </motion.div>
            <motion.div className="proof-stat" variants={slideIn}>
              <span className="proof-number">3,000h</span>
              <span className="proof-label">Tiempo devuelto a médicos</span>
            </motion.div>
            <motion.div className="proof-stat" variants={slideIn}>
              <span className="proof-number">98%</span>
              <span className="proof-label">Satisfacción de clientes</span>
            </motion.div>
          </div>

          <motion.div className="testimonials-preview" variants={fadeInUp}>
            <div className="testimonial-card">
              <p>
                "En 30 días recuperé 40 horas mensuales y mi consultorio opera perfectamente sin mí. 
                Ahora puedo dedicar tiempo a mi familia."
              </p>
              <cite>- Dr. Carlos Mendoza, Medicina General</cite>
            </div>
            <div className="testimonial-card">
              <p>
                "La coordinación entre nuestros 8 especialistas ahora es perfecta. 
                Aumentamos 60% la rentabilidad sin contratar personal."
              </p>
              <cite>- Dra. Ana Ruiz, Directora Clínica Integral</cite>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Final con FOMO */}
      <motion.section 
        className="final-cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="final-cta-content">
          <h2>🔥 La Decisión que Definirá tu Próxima Década</h2>
          <p className="final-cta-text">
            Mientras lees esto, <strong>3 médicos más se unieron a Interconecta</strong>.
            <br />
            Mientras piensas, <strong>tus competidores automatizan</strong>.
            <br />
            Mientras esperas, <strong>pierdes pacientes que nunca recuperarás</strong>.
          </p>

          <div className="urgency-indicators">
            <div className="indicator">
              <span className="indicator-icon">⏰</span>
              <span>Quedan 47 espacios en precios de lanzamiento</span>
            </div>
            <div className="indicator">
              <span className="indicator-icon">🚀</span>
              <span>Implementación garantizada en 7 días</span>
            </div>
            <div className="indicator">
              <span className="indicator-icon">💰</span>
              <span>ROI garantizado o devolvemos tu dinero</span>
            </div>
          </div>

          <div className="final-cta-buttons">
            <a 
              href="https://wa.me/+525651622408?text=Hola,%20soy%20médico%20y%20quiero%20automatizar%20mi%20práctica%20con%20IA.%20¿Podemos%20agendar%20diagnóstico%20gratuito?" 
              className="button primary-final"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="button-icon">🩺</span>
              Quiero Mi Diagnóstico Gratuito AHORA
            </a>
            <a href="#planes" className="button secondary-hero">
              <span className="button-icon">📋</span>
              Comparar Planes de Automatización
            </a>
          </div>

          <p className="guarantee-text">
            ✅ <strong>Garantía Total:</strong> Si en 60 días no ahorras mínimo 30 horas mensuales 
            y no aumentas mínimo 20% tus ingresos, te devolvemos cada peso invertido.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default PlanesGeneral;