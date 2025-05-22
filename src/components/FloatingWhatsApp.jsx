import React, { useEffect, useState } from "react";
import "./FloatingWhatsApp.css";
import whatsappIcon from "../assets/images/whatsapp-icon.png";

const CTA_MESSAGES = [
  "¿Tienes dudas? ¡Chatea con nuestro agente virtual!",
  "Automatiza tu consultorio sin complicaciones.",
  "Agenda tu demo por WhatsApp en 1 minuto.",
  "¿Quieres saber más? ¡Escríbenos por WhatsApp!",
];

const FloatingWhatsApp = () => {
  const phoneNumber = "5215519686023";
  const [showBubble, setShowBubble] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const closedUntil = localStorage.getItem("whatsappBubbleClosedUntil");
    const now = Date.now();

    if (!closedUntil || now > parseInt(closedUntil)) {
      const timer = setTimeout(() => setShowBubble(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!showBubble) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % CTA_MESSAGES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [showBubble]);

  const handleClose = () => {
    setShowBubble(false);
    const nextShow = Date.now() + 5 * 60 * 1000; // 5 minutos
    localStorage.setItem("whatsappBubbleClosedUntil", nextShow.toString());
  };

  return (
    <>
      {showBubble && (
        <div className="whatsapp-bubble pulse">
          <p>{CTA_MESSAGES[messageIndex]}</p>
          <button className="close-bubble" onClick={handleClose}>×</button>
        </div>
      )}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Chatea con nosotros por WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>
    </>
  );
};

export default FloatingWhatsApp;
