import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaCheck = ({ onSuccess }) => {
  const recaptchaRef = useRef(null);

  const handleClick = async () => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      if (token) {
        onSuccess(token);
      } else {
        alert("Verificación fallida, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="captcha-box">
      <button onClick={handleClick} className="btn-primary">
        Soy humano, mostrar reuniones
      </button>
      <ReCAPTCHA
        sitekey="6LeTLEIrAAAAACMH4bLDHn9aUtozMHut2vMbUcel"
        size="invisible"
        ref={recaptchaRef}
      />
    </div>
  );
};

export default CaptchaCheck;
