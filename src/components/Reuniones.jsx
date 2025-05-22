import React, { useState } from "react";
import CaptchaCheck from "./CaptchaCheck"; // ajusta ruta si es necesario
import "../assets/css/Reuniones.css";

const Reuniones = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <section className="reuniones-section">
      <div className="reuniones-container">
        {!isVerified ? (
          <div className="verificacion-box">
            <h2 className="verificacion-title">¿Eres humano?</h2>
            <p className="verificacion-subtitle">
              Para acceder a las reuniones disponibles, verifica que eres una persona real.
            </p>
            <CaptchaCheck onSuccess={() => setIsVerified(true)} />
          </div>
        ) : (
          <div className="card-reuniones">
            <h3 className="card-title">Agenda tu próxima reunión con Interconecta</h3>
            <div className="iframe-container">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1F4TrqzCXTEFRBBooljMOMT1elBHtMQuyoUIDLRiaaHl1q2NGDoHBkUezIf3Ule8MjkjxC9fl7?gv=true"
                frameBorder="0"
                scrolling="no"
                title="Calendario Interconecta"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reuniones;
