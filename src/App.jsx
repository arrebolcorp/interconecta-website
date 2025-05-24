import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import Plans from './components/Plans';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reuniones from './components/Reuniones';
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FaqSection from "./components/FaqSection";
import Certifications from "./components/Certifications";
import Servicios from "./components/Servicios";
import PlanesConsultorios from "./components/planes-consultorios";
import PlanesClinicas from "./components/planes-clinicas";
import CalculadoraROI from "./components/calculadora-roi";
import Faq from "./components/faq";
import Contacto from "./components/Contacto";
import ScrollToTop from './components/ScrollToTop'; // Ajusta la ruta según tu estructura
import PlanesGeneral from './components/planes-general';


function App() {
  return (
    <Router>
            <ScrollToTop /> {/* 👈 Este es el que resuelve tu problema */}
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-content">
              <Hero />
              <Features />
              <Process />
              <Plans />
              <Certifications />
              <Testimonial />
              <Contact />
              <FaqSection />
            </div>
          </>
        } />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/planes-consultorios" element={<PlanesConsultorios />} />
        <Route path="/planes-clinicas" element={<PlanesClinicas />} />
        <Route path="/calculadora-roi" element={<CalculadoraROI />} />
        <Route path="/planes-general" element={<PlanesGeneral />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reuniones" element={<Reuniones />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </Router>
  );
}

export default App;
