import React, { useState } from 'react';
import './FaqSection.css';

const faqs = [
  {
    question: '¿Qué tan rápido puedo comenzar?',
    answer: 'En promedio, tu asistente IA puede estar funcionando en menos de 7 días. No necesitas cambiar de sistema ni capacitar a tu equipo.'
  },
  {
    question: '¿Qué pasa si no me convence el servicio?',
    answer: 'No hay contratos forzosos. Puedes cancelar en cualquier momento. Además, ofrecemos una demo gratuita para que pruebes antes de pagar.'
  },
  {
    question: '¿Cómo garantizan la seguridad de los datos de mis pacientes?',
    answer: 'Usamos cifrado de nivel bancario, servidores dedicados y cumplimos con HIPAA, LGDP y NOM-004. Ningún dato médico es accesible por nuestro equipo.'
  },
  {
    question: '¿Qué resultados puedo esperar?',
    answer: 'Nuestros clientes reportan hasta 95% de captación de consultas, 60% menos cancelaciones y ROI de hasta 400% en el primer mes.'
  },
  {
    question: '¿Esto reemplaza a mi recepcionista?',
    answer: 'No. La IA complementa al equipo humano, cubriendo tareas repetitivas como confirmaciones, agendamiento y respuestas comunes.'
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
        <p className="faqx-subtitle">Resolvemos lo que más preocupa a clínicas y consultorios.</p>

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
          <p>¿Tienes más dudas sobre seguridad, planes o resultados?</p>
          <a href="/faq" className="faqx-button">Ver más preguntas frecuentes</a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
