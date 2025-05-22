import React, { useState, useEffect, useRef } from "react";
import "../assets/css/Testimonial.css"; // Ajusta esta ruta según donde esté el archivo

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  const testimonials = [
    {
      content: "Interconecta transformó nuestra operación. Redujimos las cancelaciones en un 65% y liberamos más de 60 horas mensuales que ahora dedicamos a mejorar la experiencia de nuestros pacientes.",
      author: "Dra. Ana Martínez",
      title: "Directora Clínica Estética Dermia",
      image: "/assets/images/testimonial-1.jpg"
    },
    {
      content: "Antes teníamos que contratar una persona solo para gestionar WhatsApp. Ahora, el asistente virtual se encarga automáticamente y con mejor servicio. La inversión se recuperó en el primer mes.",
      author: "Dr. Carlos Vega",
      title: "Propietario Consultorio Dermatológico Vega",
      image: "/assets/images/testimonial-2.jpg"
    },
    {
      content: "El nivel de personalización y conocimiento específico del sector médico-estético me sorprendió. No es una solución genérica, realmente entienden nuestras necesidades particulares.",
      author: "Dra. Laura Sánchez",
      title: "CEO Medical Spa Renova",
      image: "/assets/images/testimonial-3.jpg"
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
    
    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, [currentSlide]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center mb-8">
          <h2 className="text-3xl font-bold text-title-color mb-2">Lo que dicen nuestros clientes</h2>
          <p className="text-lg text-text-secondary mb-0">Empresas que han transformado su operación con Interconecta</p>
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
          <button 
            className="control-prev" 
            onClick={() => goToSlide(currentSlide - 1)}
            aria-label="Anterior"
          >
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
          <button 
            className="control-next" 
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Siguiente"
          >
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;