import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaptchaCheck from "./CaptchaCheck";
import "../assets/css/Reuniones.css";

const DiagnosticoMedicoForm = () => {
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [showEpicTransition, setShowEpicTransition] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const [rotatingPhraseIndex, setRotatingPhraseIndex] = useState(0);

  // Frases impactantes que van rotando
  const medicalImpactPhrases = [
    "🚀 Esta llamada cambiará tu práctica médica para siempre",
    "⚡ El futuro de tu consultorio comienza en esta conversación",
    "🎯 30 minutos que pueden ahorrarte 40 horas mensuales",
    "💡 La decisión que diferenciará tu clínica de la competencia",
    "🌟 Tu salto hacia la medicina del futuro empieza aquí"
  ];

  useEffect(() => {
    if (showEpicTransition) {
      const phraseInterval = setInterval(() => {
        setRotatingPhraseIndex((prev) => (prev + 1) % medicalImpactPhrases.length);
      }, 2000);
      return () => clearInterval(phraseInterval);
    }
  }, [showEpicTransition, medicalImpactPhrases.length]);

  const handleHumanVerificationSuccess = () => {
    setShowEpicTransition(true);
    
    // Secuencia de transición épica
    setTimeout(() => setTransitionStep(1), 1000);
    setTimeout(() => setTransitionStep(2), 3000);
    setTimeout(() => setTransitionStep(3), 5000);
    setTimeout(() => {
      setShowEpicTransition(false);
      setIsHumanVerified(true);
    }, 7000);
  };

  // Animaciones
  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const medicalIconFloat = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const successBadgePulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="medical-diagnostic-wrapper">
      <div className="medical-diagnostic-container">
        <AnimatePresence mode="wait">
          
          {/* Etapa 1: Verificación Humana */}
          {!isHumanVerified && !showEpicTransition && (
            <motion.div
              key="human-verification"
              className="verification-stage-wrapper"
              variants={pageContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {/* Layout: Info Izquierda + Verificación Derecha */}
              <div className="verification-layout">
                
                {/* Columna Izquierda: Información */}
                <div className="verification-info-column">
                  <motion.div 
                    className="medical-hero-icon"
                    animate={medicalIconFloat}
                  >
                    🤖
                  </motion.div>
                  
                  <motion.h1 
                    className="medical-verification-title"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="medical-gradient-text">Diagnóstico Médico</span>
                    <br />
                    Exclusivo para Profesionales
                  </motion.h1>
                  
                  <motion.p 
                    className="medical-verification-subtitle"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Accede al análisis personalizado que está transformando
                    <br />
                    <strong>+75 consultorios médicos en México</strong>
                  </motion.p>

                  <motion.div 
                    className="medical-exclusivity-badges"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="medical-badge">
                      <span className="medical-badge-icon">⚡</span>
                      <span>Solo 30 minutos</span>
                    </div>
                    <div className="medical-badge">
                      <span className="medical-badge-icon">🎯</span>
                      <span>100% personalizado</span>
                    </div>
                    <div className="medical-badge">
                      <span className="medical-badge-icon">🔒</span>
                      <span>Completamente confidencial</span>
                    </div>
                  </motion.div>
                </div>

                {/* Columna Derecha: Verificación */}
                <div className="verification-form-column">
                  <motion.div 
                    className="medical-verification-box"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="medical-security-header">
                      <div className="medical-security-icon">🛡️</div>
                      <h3>Verificación de Seguridad</h3>
                      <p>Confirmamos que eres un profesional médico real</p>
                    </div>
                    
                    <div className="medical-captcha-container">
                      <CaptchaCheck onSuccess={handleHumanVerificationSuccess} />
                    </div>
                    
                    <div className="medical-trust-indicators">
                      <div className="medical-trust-item">
                        <span>🔐</span>
                        <span>Datos protegidos con cifrado AES-256</span>
                      </div>
                      <div className="medical-trust-item">
                        <span>⚕️</span>
                        <span>Cumplimiento HIPAA y NOM-004-SSA3</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Etapa 2: Transición Épica (Sin cambios, funciona bien) */}
          {showEpicTransition && (
            <motion.div
              key="epic-transition"
              className="medical-transition-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="medical-transition-background">
                <div className="medical-particle-field">
                  {[...Array(50)].map((_, i) => (
                    <div key={i} className={`medical-particle medical-particle-${i % 3}`}></div>
                  ))}
                </div>
              </div>

              <div className="medical-transition-content">
                <AnimatePresence mode="wait">
                  {transitionStep === 0 && (
                    <motion.div
                      key="transition-step0"
                      className="medical-transition-step"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <div className="medical-step-icon">✅</div>
                      <h2>Verificación Exitosa</h2>
                      <p>Bienvenido, Doctor</p>
                    </motion.div>
                  )}

                  {transitionStep === 1 && (
                    <motion.div
                      key="transition-step1"
                      className="medical-transition-step"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                    >
                      <div className="medical-step-icon">🚀</div>
                      <h2>Conectando con el Futuro</h2>
                      <p>Preparando tu análisis personalizado...</p>
                    </motion.div>
                  )}

                  {transitionStep === 2 && (
                    <motion.div
                      key="transition-step2"
                      className="medical-transition-step"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -100, opacity: 0 }}
                    >
                      <div className="medical-step-icon">⚡</div>
                      <h2>Tu Transformación Comienza</h2>
                      <p>Accediendo a herramientas de vanguardia...</p>
                    </motion.div>
                  )}

                  {transitionStep === 3 && (
                    <motion.div
                      key="transition-step3"
                      className="medical-transition-step"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                    >
                      <div className="medical-step-icon">🌟</div>
                      <h2>Bienvenido al Futuro de la Medicina</h2>
                      <motion.p
                        key={rotatingPhraseIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {medicalImpactPhrases[rotatingPhraseIndex]}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="medical-loading-progress">
                  <div className="medical-progress-bar">
                    <motion.div 
                      className="medical-progress-fill"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Etapa 3: Calendario Principal */}
          {isHumanVerified && !showEpicTransition && (
            <motion.div
              key="calendar-booking"
              className="calendar-stage-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              {/* Layout: Info Izquierda + Calendario Derecha */}
              <div className="calendar-layout">
                
                {/* Columna Izquierda: Información del Calendario */}
                <div className="calendar-info-column">
                  <motion.div 
                    className="medical-success-badge"
                    animate={successBadgePulse}
                  >
                    <span className="medical-badge-icon">🎯</span>
                    <span>Acceso Autorizado</span>
                  </motion.div>

                  <motion.h2 
                    className="calendar-main-title"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Tu <span className="medical-gradient-text">Diagnóstico Personalizado</span>
                    <br />
                    Te Espera
                  </motion.h2>

                  <motion.p 
                    className="calendar-main-subtitle"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Agenda tu sesión de 30 minutos con nuestro especialista en automatización médica.
                    <br />
                    <strong>Esta conversación puede transformar tu práctica para siempre.</strong>
                  </motion.p>

                  <motion.div 
                    className="calendar-benefits-grid"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="calendar-benefit-item">
                      <span className="calendar-benefit-icon">📊</span>
                      <div>
                        <h4>Análisis Personalizado</h4>
                        <p>Evaluación específica de tu consultorio</p>
                      </div>
                    </div>
                    <div className="calendar-benefit-item">
                      <span className="calendar-benefit-icon">💰</span>
                      <div>
                        <h4>Cálculo de ROI</h4>
                        <p>Proyección exacta de ahorro de tiempo y costos</p>
                      </div>
                    </div>
                    <div className="calendar-benefit-item">
                      <span className="calendar-benefit-icon">🚀</span>
                      <div>
                        <h4>Plan de Implementación</h4>
                        <p>Hoja de ruta personalizada en 7 días</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Garantías */}
                  <motion.div 
                    className="calendar-guarantees-grid"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="calendar-guarantee-item">
                      <span>⏰</span>
                      <span>15 minutos exactos</span>
                    </div>
                    <div className="calendar-guarantee-item">
                      <span>🔒</span>
                      <span>100% confidencial</span>
                    </div>
                    <div className="calendar-guarantee-item">
                      <span>💎</span>
                      <span>Sin compromiso</span>
                    </div>
                    <div className="calendar-guarantee-item">
                      <span>📱</span>
                      <span>Por videollamada</span>
                    </div>
                  </motion.div>

                  {/* Urgencia */}
                  <motion.div 
                    className="medical-urgency-reminder"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <span className="medical-urgency-icon">🔥</span>
                    <p>
                      <strong>Solo 47 espacios disponibles</strong> en nuestra agenda de diagnósticos personalizados.
                      <br />
                      <em>Más de 25 médicos han agendado esta semana.</em>
                    </p>
                  </motion.div>
                </div>

                {/* Columna Derecha: Calendario Completo */}
                <div className="calendar-widget-column">
                  <motion.div 
                    className="calendar-widget-container"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="calendar-widget-header">
                      <div className="calendar-header-icon">📅</div>
                      <h3>Selecciona tu Momento Ideal</h3>
                      <p>Todos los horarios incluyen análisis completo y recomendaciones específicas</p>
                    </div>

                    <div className="calendar-iframe-wrapper">
                      <iframe
                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1F4TrqzCXTEFRBBooljMOMT1elBHtMQuyoUIDLRiaaHl1q2NGDoHBkUezIf3Ule8MjkjxC9fl7?gv=true"
                        frameBorder="0"
                        scrolling="yes"
                        title="Diagnóstico Médico Personalizado - Interconecta Capital"
                        allowFullScreen
                        className="calendar-responsive-iframe"
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efectos de Fondo (Sin cambios) */}
      <div className="medical-background-effects">
        <div className="medical-floating-elements">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`medical-floating-element medical-element-${i}`}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              {['⚕️', '🔬', '💊', '🩺', '⚡', '🚀'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticoMedicoForm;