const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Para generar tokens

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Log para ver los datos recibidos del frontend
    console.log("Datos recibidos - Email:", email, "Contraseña:", password); //BORRAR ESTO UNA VEZ FUNCIONE EL CÓDIGO

    // 1. Buscar usuario por email
    const usuario = await Usuario.findOne({
      where: { Email: email },
      include: [{ model: Rol, attributes: ["Nombre"] }], // Incluir datos del rol
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Log para ver el hash almacenado en la BD
    console.log("Hash almacenado en BD:", usuario.Contraseña); //BORRAR ESTO UNA VEZ FUNCIONE EL CÓDIGO

    // 2. Validar contraseña
    // const contraseñaValida = await bcrypt.compare(password, usuario.Contraseña);// METODO DE VALIDACIÓN ANTERIOR
    //const contraseñaValida = await usuario.validarContraseña(password);
    console.log("Resultado de comparación:", contraseñaValida); // Debe ser true o false
    console.log(usuario);
    if (!contraseñaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generar token JWT (opcional pero recomendado)
    const token = jwt.sign(
      {
        id: usuario.ID_Usuario,
        rol: usuario.Rol.Nombre,
      },
      process.env.JWT_SECRET || "tu_secreto",
      { expiresIn: "1h" }
    );

    // 4. Responder con token y datos del usuario
    res.status(200).json({
      token,
      user: {
        id: usuario.ID_Usuario,
        nombre: usuario.Nombre,
        email: usuario.Email,
        rol: usuario.Rol.Nombre,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
