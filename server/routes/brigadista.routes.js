// Importamos el controlador 'AdminController' que contiene las funciones para manejar las operaciones relacionadas con los administradores.
const BrigadistaController = require("../controllers/brigadista.controller");

// Exportamos una función que define las rutas de la API para interactuar con los administradores en la aplicación.
module.exports = function (app) {
  // Definimos una ruta POST '/api/admin/new' para crear un nuevo administrador.
  app.post("/api/brigadista/new", BrigadistaController.createBrigadista);

  // Definimos una ruta GET '/api/admins' para obtener todos los administradores.
  app.get("/api/brigadistas", BrigadistaController.getAllBrigadistas);

  // Definimos una ruta GET '/api/admin/:id' para obtener un administrador específico por su ID.
  app.get("/api/brigadista/:id", BrigadistaController.getBrigadista);

  // Definimos una ruta PUT '/api/admin/:id' para actualizar un administrador específico por su ID.
  app.put("/api/brigadista/:id/", BrigadistaController.updateBrigadista);

  // Definimos una ruta DELETE '/api/admin/:id' para eliminar un administrador específico por su ID.
  app.delete("/api/brigadista/:id", BrigadistaController.deleteBrigadista);
};
