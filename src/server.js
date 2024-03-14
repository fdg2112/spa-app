const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar datos de formulario y archivos adjuntos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Multer para el manejo de archivos adjuntos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'appspaemail@gmail.com',
    pass: 'appspapassword',
  },
});

// Ruta para procesar el formulario y enviar el correo electrónico
app.post('/procesar-email', upload.single('fileAdjunto'), (req, res) => {
  const { desde, para, titulo, mensaje } = req.body;
  const adjunto = req.file;

  const mailOptions = {
    from: desde,
    to: para,
    subject: titulo,
    text: mensaje,
    attachments: [{ filename: adjunto.originalname, path: adjunto.path }],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Email enviado: ' + info.response);
      res.status(200).send('Correo electrónico enviado con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
