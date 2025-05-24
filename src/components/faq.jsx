import React, { useState } from 'react';
import './FaqSection.css';

const faqs = [
  // Implementación y funcionamiento
  { question: '¿Qué necesito para comenzar?', answer: 'Solo agenda tu diagnóstico gratuito. No necesitas instalar nada ni tener conocimientos técnicos.' },
  { question: '¿Qué tipo de procesos puedo automatizar?', answer: 'Desde confirmaciones de citas, seguimiento post-tratamiento, hasta campañas de WhatsApp y cobros automatizados.' },
  { question: '¿La IA responde automáticamente en WhatsApp?', answer: 'Sí. Nuestro asistente responde 24/7, filtra consultas y agenda automáticamente sin intervención humana.' },
  { question: '¿Puedo usar mi propio número de WhatsApp?', answer: 'Sí, se puede usar un número existente (Business API) o crear uno exclusivo para automatización médica.' },
  { question: '¿Cuánto tiempo toma ver resultados?', answer: 'Nuestros clientes suelen ver reducción de cancelaciones y aumento de citas confirmadas desde la semana 1.' },
  
  // Precios y pagos
  { question: '¿Tienen algún periodo de prueba?', answer: 'Ofrecemos diagnóstico operativo gratuito. Los planes son mensuales y puedes cancelar cuando quieras.' },
  { question: '¿Puedo pagar con transferencia o tarjeta?', answer: 'Sí. Aceptamos tarjetas, transferencia SPEI, MercadoPago y pagos recurrentes por suscripción.' },
  { question: '¿Hay penalización por cancelar?', answer: 'No. Todos nuestros planes son sin contrato forzoso. Puedes pausar o cancelar libremente.' },
  { question: '¿Qué incluye el pago del setup?', answer: 'Incluye configuración de WhatsApp IA, CRM, flujos, formularios y dashboards personalizados.' },
  { question: '¿Qué pasa si no estoy conforme con el servicio?', answer: 'Nos enfocamos en resultados. Si no ves mejora, puedes cancelar sin penalización ni explicaciones.' },

  // Seguridad y normativas
  { question: '¿Qué tan seguros están los datos?', answer: 'Usamos cifrado AES-256, redes privadas, backups diarios, autenticación por roles y acceso seguro.' },
  { question: '¿Cumplen con la NOM-004, LGDP y HIPAA?', answer: 'Sí. Toda la arquitectura cumple estándares nacionales e internacionales de privacidad médica.' },
  { question: '¿Interconecta puede ver mis datos de pacientes?', answer: 'No. Implementamos modelo Zero-Knowledge: solo el médico accede a datos clínicos. Nosotros vemos flujos, no historiales.' },
  { question: '¿Dónde se almacenan los datos?', answer: 'En servidores encriptados en México, bajo infraestructura dedicada y backups automáticos.' },
  { question: '¿Puedo restringir accesos por tipo de usuario?', answer: 'Sí. Se pueden crear roles: recepcionista, doctor, administrador, etc. con permisos personalizados.' },

  // Resultados y casos
  { question: '¿Qué resultados han tenido otras clínicas?', answer: 'Clientes reportan 95% de consultas capturadas, ROI de 400% el primer mes y cancelaciones reducidas a la mitad.' },
  { question: '¿Tienen casos documentados?', answer: 'Sí. Puedes ver testimonios reales al final de la web o solicitar una demo con casos similares a tu especialidad.' },
  { question: '¿Esto reemplaza al personal humano?', answer: 'No. Libera a tu equipo para tareas clínicas. La IA cubre agendamiento, seguimientos y mensajes fuera de horario.' },
  { question: '¿Sirve si solo soy un consultorio pequeño?', answer: 'Sí. Tenemos planes desde $1,500 MXN/mes para consultorios con menos de 60 pacientes mensuales.' },
  { question: '¿Se adapta a mi especialidad médica?', answer: 'Sí. Creamos flujos y mensajes personalizados para dermatología, cirugía plástica, medicina estética, wellness y más.' },

  // Técnica y soporte
  { question: '¿Qué pasa si tengo un sistema ya funcionando?', answer: 'Podemos integrarnos con tu CRM, hoja de Google, Calendario o migrar tus datos si lo deseas.' },
  { question: '¿Tienen soporte técnico?', answer: 'Sí. Soporte vía WhatsApp y correo. Planes Dominio y Enterprise tienen atención prioritaria en <4h.' },
  { question: '¿Cómo gestionan citas y calendarios?', answer: 'Nuestro sistema se conecta a tu Google Calendar o CRM y agenda con lógica de disponibilidad y duración por servicio.' },
  { question: '¿Qué herramientas se integran?', answer: 'Google Calendar, Sheets, Notion, Drive, MercadoPago, Stripe, CRM, Facebook Ads, WhatsApp API, entre otras.' },
  { question: '¿Se puede modificar la configuración con el tiempo?', answer: 'Sí. Cada flujo y respuesta puede adaptarse, escalarse o personalizarse por especialidad o temporada.' },

  // Objections finales
  { question: 'No tengo tiempo de implementar algo nuevo…', answer: 'No te preocupes. Nosotros lo implementamos por ti. Solo necesitamos 1 hora de tu tiempo para dejarlo listo.' },
  { question: '¿Tengo que cambiar de CRM?', answer: 'No es obligatorio. Podemos conectar con el que ya usas o sugerirte uno médico compatible con nuestra IA.' },
  { question: '¿Y si no soy experto en tecnología?', answer: 'No necesitas serlo. Nuestro equipo te guía y la IA hace el trabajo. Tú solo enfócate en atender pacientes.' },
  { question: '¿Puedo escalar esto conforme crezca?', answer: 'Sí. Nuestra arquitectura es modular. Empiezas con flujos básicos y puedes activar funciones más complejas cuando gustes.' },
  { question: '¿Qué pasa si no respondo los mensajes?', answer: 'Nuestra IA puede resolver hasta 80% de mensajes sin ti. Los que requieren intervención quedan marcados como pendientes.' }
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faqx-section">
      <div className="faqx-container">
        <h2 className="faqx-title">Centro de Preguntas Frecuentes</h2>
        <p className="faqx-subtitle">Aquí respondemos TODO lo que médicos, clínicas y consultorios preguntan antes de automatizar.</p>

        <div className="faqx-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faqx-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggle(index)}
            >
              <div className="faqx-question">
                <span>{faq.question}</span>
                <span className="faqx-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faqx-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
