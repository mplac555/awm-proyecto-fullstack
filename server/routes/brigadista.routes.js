// Importamos el controlador 'AdminController' que contiene las funciones para manejar las operaciones relacionadas con los administradores.
const BrigadistaController = require("../controllers/brigadista.controller");
const { protect: adminProtected } = require("../middleware/adminAuth.mw");
const { protect: brigProtected } = require("../middleware/brigAuth.mw");

// Exportamos una función que define las rutas de la API para interactuar con los administradores en la aplicación.
module.exports = function (app) {
  // Definimos una ruta POST '/api/admin/new' para crear un nuevo administrador.
  app.post(
    "/api/brigadista/new",
    adminProtected,
    BrigadistaController.createBrigadista
  );

  // Definimos una ruta GET '/api/admins' para obtener todos los administradores.
  app.get(
    "/api/brigadistas",
    adminProtected,
    BrigadistaController.getAllBrigadistas
  );

  // Definimos una ruta GET '/api/admin/:id' para obtener un administrador específico por su ID.
  app.get(
    "/api/brigadista/:id",
    adminProtected,
    BrigadistaController.getBrigadista
  );

  // Definimos una ruta PUT '/api/admin/:id' para actualizar un administrador específico por su ID.
  app.put(
    "/api/brigadista/:id/",
    adminProtected,
    BrigadistaController.updateBrigadista
  );

  // Definimos una ruta DELETE '/api/admin/:id' para eliminar un administrador específico por su ID.
  app.delete(
    "/api/brigadista/:id",
    adminProtected,
    BrigadistaController.deleteBrigadista
  );

  // Definimos una ruta POST '/api/admin/login' para el inicio de sesión de un brigadista.
  app.post("/api/brigadista/login", BrigadistaController.loginBrigadista);

  //Definimos una ruta GET para otorgar los detalles al perfil
  app.get(
    "/api/brigadista/:name/:email",
    brigProtected,
    BrigadistaController.getBrigadistaProfile
  );
};
