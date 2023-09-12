// Importamos el controlador 'AdminController' que contiene las funciones para manejar las operaciones relacionadas con los administradores.
const AlertaController = require("../controllers/alerta.controller");
const { protect: adminProtected } = require("../middleware/adminAuth.mw");
const { protect: brigProtected } = require("../middleware/brigAuth.mw");

// Exportamos una función que define las rutas de la API para interactuar con los administradores en la aplicación.
module.exports = function (app) {
  // Definimos una ruta POST '/api/admin/new' para crear un nuevo administrador.
  app.post("/api/alerta/new", brigProtected, AlertaController.createAlerta);

  // Definimos una ruta GET '/api/admins' para obtener todos los administradores.
  app.get("/api/alertas", adminProtected, AlertaController.getAllAlertas);

  // Definimos una ruta GET '/api/admin/:id' para obtener un administrador específico por su ID.
  app.get("/api/alerta/:id", adminProtected, AlertaController.getAlerta);

  // Definimos una ruta PUT '/api/admin/:id' para actualizar un administrador específico por su ID.
  app.put("/api/alerta/:id/", adminProtected, AlertaController.updateAlerta);

  // Definimos una ruta DELETE '/api/admin/:id' para eliminar un administrador específico por su ID.
  app.delete("/api/alerta/:id", adminProtected, AlertaController.deleteAlerta);
};
