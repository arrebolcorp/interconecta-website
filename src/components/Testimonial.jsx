import React, { useState, useEffect, useRef } from "react";
import "../assets/css/Testimonial.css";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      content: "Pasé de perder 15 pacientes al mes a tener lista de espera. La IA responde más rápido que cualquier asistente humano que tuve antes.",
      author: "Dra. Mariana Torres",
      title: "Especialista en Medicina Estética - CDMX",
      image: "/assets/images/testimonial-1.jpg"
    },
    {
      content: "Nuestro asistente médico virtual responde WhatsApp, agenda, confirma y reprograma. Es como tener un equipo de recepción completo.",
      author: "Dr. Carlos Vega",
      title: "Consultorio Dermatológico Vega - Guadalajara",
      image: "/assets/images/testimonial-2.jpg"
    },
    {
      content: "Redujimos cancelaciones 70% y aumentamos ingresos 40% en 2 meses. Interconecta vale cada peso que pagamos.",
      author: "Dra. Sofía Méndez",
      title: "Clínica Rejuveness - Monterrey",
      image: "/assets/images/testimonial-3.jpg"
    },
    {
      content: "Automatizar con Interconecta fue la mejor decisión operativa del año. Nuestro personal ahora se enfoca en el paciente, no en el teléfono.",
      author: "Dr. Emilio Cárdenas",
      title: "Clínica Renova - Puebla",
      image: "/assets/images/testimonial-4.jpg"
    },
    {
      content: "No pensé que la IA podría ser tan empática. Los pacientes nos felicitan por la atención automatizada.",
      author: "Dra. Alejandra Ruiz",
      title: "Consultorio Belle Derma - CDMX",
      image: "/assets/images/testimonial-5.jpg"
    },
    {
      content: "Nuestro seguimiento post-tratamiento mejoró radicalmente. Ahora sabemos si el paciente se sintió bien o si necesita algo más.",
      author: "Dra. Mónica Ríos",
      title: "Estética Avanzada Ríos - Mérida",
      image: "/assets/images/testimonial-6.jpg"
    },
    {
      content: "La diferencia con Interconecta es que realmente entienden la medicina privada. No solo son técnicos, son aliados médicos.",
      author: "Dr. Guillermo Lara",
      title: "Clínica Premium Care - CDMX",
      image: "/assets/images/testimonial-7.jpg"
    },
    {
      content: "Implementación en 7 días, resultados desde el día 10. Y sin cambiar mi sistema actual. Increíble.",
      author: "Dra. Lucía Fernández",
      title: "Consultorio Estético Lúmina - León",
      image: "/assets/images/testimonial-8.jpg"
    }
  ];

  const goToSlide = (index) => {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;

    setCurrentSlide(index);

    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      if (index !== currentSlide) {
        setCurrentSlide(index);
      }
    };

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [currentSlide]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center mb-8">
          <h2 className="text-3xl font-bold text-title-color mb-2">Lo que dicen los médicos que ya automatizan</h2>
          <p className="text-lg text-text-secondary mb-0">Testimonios reales de clínicas y consultorios que ya usan Interconecta</p>
        </div>

        <div className="testimonials-slider" ref={sliderRef}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={testimonial.image} alt={testimonial.author} />
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.author}</h4>
                  <p className="author-title">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-controls">
          <button className="control-prev" onClick={() => goToSlide(currentSlide - 1)} aria-label="Anterior">
            <span>←</span>
          </button>
          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
          <button className="control-next" onClick={() => goToSlide(currentSlide + 1)} aria-label="Siguiente">
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
