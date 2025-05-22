import React, { useState } from 'react';
import './FaqSection.css';

const faqs = [
  {
    question: '¿Qué tipo de procesos puedo automatizar con Interconecta?',
    answer: 'Puedes automatizar tareas como atención al cliente por WhatsApp, generación de reportes, seguimiento de prospectos, envío de recordatorios, integración con Google Sheets, CRMs como Zoho, y más. Nos adaptamos a tu flujo de trabajo actual.'
  },
  {
    question: '¿Qué pasa si mi clínica ya tiene un sistema?',
    answer: 'Podemos integrarnos a tu sistema existente o migrar datos a una solución más automatizada.'
  },
  {
    question: '¿Tienen planes para consultorios pequeños?',
    answer: 'Sí, contamos con planes especiales desde $890 MXN para consultorios con menos de 60 pacientes al mes.'
  },
  {
    question: '¿Qué medidas de seguridad tienen con los datos que manejan de clínicas, consultorios y pacientes?',
    answer: 'En Interconecta Capital se cubren los mecanismos de cifrado, autenticación, normas regulatorias (HIPAA, LGDP, NOM-004), estructura de certificados, respaldo seguro de datos, redes protegidas y control de accesos. También implementamos un modelo de \"Zero-Knowledge\", donde no tenemos acceso a datos sensibles, solo a metadatos anonimizados.'
  },
  {
    question: '¿Cómo agendo una reunión para conocer más?',
    answer: 'Solo haz clic en el apartado “Diagnóstico”, valida que eres humano y elige la hora que más te convenga. En menos de 30 segundos tendrás tu cita confirmada.'
  }
];

const FaqSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="faqx-section">
      <div className="faqx-container">
        <h2 className="faqx-title">Preguntas Frecuentes (FAQ)</h2>
        <p className="faqx-subtitle">Nuestros futuros clientes quieren saber.</p>

        <div className="faqx-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faqx-item ${openQuestion === index ? 'open' : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              <div className="faqx-question">
                <span>{faq.question}</span>
                <span className="faqx-icon">{openQuestion === index ? '−' : '+'}</span>
              </div>
              {openQuestion === index && (
                <div className="faqx-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faqx-footer">
          <p>¿Aún tienes alguna pregunta?</p>
          <a href="../#contact" className="faqx-button">Contáctanos</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
