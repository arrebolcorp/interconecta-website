import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ planId, planName }) => {
  const paypalRef = useRef();
  const scriptLoaded = useRef(false);

  // Mapeo de planes a IDs de PayPal
  const planIds = {
    impulso: 'P-7YE206551L679143TNA3RWFI',
    crecimiento: 'P-XXXXXXXXXXXXXXXXX', // Reemplaza con tu ID real
    dominio: 'P-YYYYYYYYYYYYYYYYY'      // Reemplaza con tu ID real
  };

  useEffect(() => {
    // Función para cargar el script de PayPal
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        if (window.paypal) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AV7IlVWNb5O8GzzA1tiFNJG_XAH_se9NL3BKPdFWk3XUBCXGXQ7XoAL0-eshjEz8NIlH8A1vgqA0e5Pi&vault=true&intent=subscription';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Función para renderizar el botón de PayPal
    const renderPayPalButton = () => {
      if (paypalRef.current && window.paypal && !scriptLoaded.current) {
        // Limpiar el contenedor antes de renderizar
        paypalRef.current.innerHTML = '';
        
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'subscribe',
            height: 40
          },
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              plan_id: planIds[planId] || planIds.impulso
            });
          },
          onApprove: function(data, actions) {
            // Aquí puedes manejar el éxito de la suscripción
            console.log('Subscription ID:', data.subscriptionID);
            alert(`¡Suscripción exitosa! ID: ${data.subscriptionID}`);
            
            // Opcional: redirigir a página de éxito
            // window.location.href = '/success?subscription=' + data.subscriptionID;
          },
          onError: function(err) {
            console.error('PayPal Error:', err);
            alert('Hubo un error al procesar el pago. Inténtalo de nuevo.');
          },
          onCancel: function(data) {
            console.log('Payment cancelled:', data);
            // Opcional: manejar cancelación
          }
        }).render(paypalRef.current);
        
        scriptLoaded.current = true;
      }
    };

    // Cargar script y renderizar botón
    if (!scriptLoaded.current) {
      loadPayPalScript()
        .then(() => {
          renderPayPalButton();
        })
        .catch((error) => {
          console.error('Error loading PayPal script:', error);
        });
    }

    // Cleanup
    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
      scriptLoaded.current = false;
    };
  }, [planId]);

  return (
    <div className="paypal-button-container">
      <div 
        ref={paypalRef} 
        id={`paypal-button-container-${planId}`}
        style={{ minHeight: '50px' }}
      />
      <p className="payment-note">
        💳 Pago seguro procesado por PayPal
      </p>
    </div>
  );
};

export default PayPalButton;