// Importamos el controlador 'AdminController' que contiene las funciones para manejar las operaciones relacionadas con los administradores.
const AdminController = require("../controllers/admin.controller");
const { protect } = require("../middleware/adminAuth.mw");

// Exportamos una función que define las rutas de la API para interactuar con los administradores en la aplicación.
module.exports = function (app) {
  // Definimos una ruta POST '/api/admin/new' para crear un nuevo administrador.
  app.post("/api/admin/new", protect, AdminController.createAdmin);

  // Definimos una ruta GET '/api/admins' para obtener todos los administradores.
  app.get("/api/admins", protect, AdminController.getAllAdmins);

  // Definimos una ruta GET '/api/admin/:id' para obtener un administrador específico por su ID.
  app.get("/api/admin/:id", protect, AdminController.getAdmin);

  // Definimos una ruta PUT '/api/admin/:id' para actualizar un administrador específico por su ID.
  app.put("/api/admin/:id/", protect, AdminController.updateAdmin);

  // Definimos una ruta DELETE '/api/admin/:id' para eliminar un administrador específico por su ID.
  app.delete("/api/admin/:id", protect, AdminController.deleteAdmin);

  // Definimos una ruta POST '/api/admin/login' para el inicio de sesión de un administrador.
  app.post("/api/admin/login", AdminController.loginAdmin);
};
