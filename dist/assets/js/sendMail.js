// backend/sendMail.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, business, businessType } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jahirfto@gmail.com',
      pass: 'THEvegettarex7$'
    }
  });

  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: 'leads@interconecta.capital',
    subject: `Nueva solicitud de demo - ${business}`,
    html: `
      <h2>Nuevo contacto desde Interconecta</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Clínica:</strong> ${business}</p>
      <p><strong>Tipo de negocio:</strong> ${businessType}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo', error);
    res.status(500).json({ message: 'Error al enviar correo' });
  }
});

app.listen(3001, () => console.log('Servidor escuchando en puerto 3001'));
