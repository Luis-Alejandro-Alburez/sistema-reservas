const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models"); // Cambia esta línea
const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const espacioRoutes = require("./routes/espacioRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

const app = express();
console.log("estoy en express");

// Middleware
app.use(
  cors()
  //origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // O la URL exacta de tu frontend
  //origin: "*",
  //methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //allowedHeaders: ["Content-Type", "Authorization"],
  //credentials: true, // Si usas cookies/tokens de autenticación
);

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/espacios", espacioRoutes);
app.use("/api/reservas", reservaRoutes);

// Sincronización de modelos
sequelize
  .sync({ force: false, alter: true }) // Cambia a true solo en desarrollo para recrear tablas
  .then(() => {
    console.log("Base de datos sincronizada");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
    process.exit(1);
  });

module.exports = app;
