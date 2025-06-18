class ReservaManager {
  constructor() {
    this.API_URL = "http://localhost:3000/api";
    this.token = localStorage.getItem("token");
  }

  async cargarEspaciosDisponibles(fecha, tipo) {
    try {
      const response = await fetch(
        `${this.API_URL}/espacios/disponibles?fecha=${fecha}&tipo=${tipo}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al cargar espacios");

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async crearReserva(reservaData) {
    try {
      const response = await fetch(`${this.API_URL}/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(reservaData),
      });

      if (!response.ok) throw new Error("Error al crear reserva");

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async obtenerMisReservas() {
    try {
      const response = await fetch(`${this.API_URL}/reservas/usuario`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener reservas");

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async cancelarReserva(idReserva) {
    try {
      const response = await fetch(
        `${this.API_URL}/reservas/${idReserva}/cancelar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al cancelar reserva");

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
