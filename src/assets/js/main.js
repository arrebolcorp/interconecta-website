// En assets/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
      });
    }
    
    // Plan tabs
    const planTabs = document.querySelectorAll('.plan-tab');
    const planCategories = document.querySelectorAll('.plan-category');
    
    if (planTabs.length > 0 && planCategories.length > 0) {
      planTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Desactivar todos los tabs
          planTabs.forEach(t => t.classList.remove('active'));
          
          // Activar el tab clickeado
          this.classList.add('active');
          
          // Mostrar la categoría correspondiente
          const targetCategory = this.getAttribute('data-target');
          
          planCategories.forEach(category => {
            category.classList.remove('active');
            if (category.id === targetCategory) {
              category.classList.add('active');
            }
          });
        });
      });
    }
    
    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonials-dots');
    const prevButton = document.querySelector('.control-prev');
    const nextButton = document.querySelector('.control-next');
    
    if (testimonialsSlider && testimonialCards.length > 0) {
      // Crear los dots
      testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
      });
      
      const dots = document.querySelectorAll('.dot');
      
      // Funciones de navegación
      let currentSlide = 0;
      
      function goToSlide(index) {
        if (index < 0) index = testimonialCards.length - 1;
        if (index >= testimonialCards.length) index = 0;
        
        currentSlide = index;
        
        testimonialsSlider.scrollTo({
          left: testimonialCards[index].offsetLeft,
          behavior: 'smooth'
        });
        
        // Actualizar los dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
      
      // Botones de navegación
      if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
          goToSlide(currentSlide - 1);
        });
        
        nextButton.addEventListener('click', () => {
          goToSlide(currentSlide + 1);
        });
      }
      
      // Scroll detection para actualizar dots
      testimonialsSlider.addEventListener('scroll', () => {
        const scrollPosition = testimonialsSlider.scrollLeft;
        const sliderWidth = testimonialsSlider.offsetWidth;
        
        const newSlideIndex = Math.round(scrollPosition / sliderWidth);
        
        if (newSlideIndex !== currentSlide) {
          currentSlide = newSlideIndex;
          
          // Actualizar dots
          dots.forEach(dot => dot.classList.remove('active'));
          if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
          }
        }
      });
    }
    
    // Contact form
    const contactForm = document.getElementById('demoForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí podrías agregar código para procesar el formulario
        // Por ahora, solo mostramos un mensaje
        
        const formData = new FormData(this);
        const formValues = {};
        
        formData.forEach((value, key) => {
          formValues[key] = value;
        });
        
        console.log('Formulario enviado:', formValues);
        
        // Simulación de envío exitoso
        contactForm.innerHTML = `
          <div class="form-success">
            <div class="success-icon">✓</div>
            <h3>¡Solicitud enviada con éxito!</h3>
            <p>Nos pondremos en contacto contigo en las próximas 24 horas para agendar tu demo personalizada.</p>
          </div>
        `;
      });
    }
  });