const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/userRoute');
app.use(cors()); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 4, // máx 4 req por IP
  message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.',
  standardHeaders: true, // agrega headers `RateLimit-*`
  legacyHeaders: false, // desactiva `X-RateLimit-*`
  handler: (req, res) => {
    return res.status(429).json({
      message: 'Has excedido el número de intentos permitidos. Inténtalo de nuevo en 15 minutos.'
    });
  }
}));

app.use(express.json());
app.use('/users', userRoutes);

config={SERVER:"localhost",PORT:3000}
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});