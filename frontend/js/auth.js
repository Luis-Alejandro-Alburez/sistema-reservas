class AuthManager {
  constructor() {
    this.API_URL = "http://localhost:3000/api/auth";
  }

  async login(email, password) {
    try {
      console.log("Enviando petición a:", `${this.API_URL}/login`); // 1. Log de URL
      console.log("Datos enviados:", { email, password }); // 2. Log de datos
      const response = await fetch(`${this.API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respuesta del servidor:", response); // 3. Log de respuesta

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error detallado del servidor:", errorData); // 4. Log de error
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Error completo en AuthManager:", error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          apellido: userData.apellido,
          email: userData.email,
          password: userData.password,
          telefono: userData.telefono,
          idRol: 2, //asignación fija para usuarios normales, recordar de modificarlo despues.
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar");
      }

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
