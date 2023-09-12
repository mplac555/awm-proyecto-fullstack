// Importamos el controlador 'OwnerController' que contiene las funciones para manejar las operaciones relacionadas con los propietarios.
const OwnerController = require("../controllers/propietario.controller");
const { protect } = require("../middleware/adminAuth.mw");

// Exportamos una función que define las rutas de la API para interactuar con los propietarios en la aplicación.
module.exports = function (app) {
  // Definimos una ruta POST '/api/owner/new' para crear un nuevo propietario.
  app.post("/api/owner/new", protect, OwnerController.createOwner);

  // Definimos una ruta GET '/api/owner' para obtener todos los propietarios.
  app.get("/api/owners", protect, OwnerController.getAllOwners);

  // Definimos una ruta GET '/api/owner/:id' para obtener un propietario específico por su ID.
  app.get("/api/owner/:id", protect, OwnerController.getOwner);

  // Definimos una ruta PUT '/api/owner/:id' para actualizar un propietario específico por su ID.
  app.put("/api/owner/:id/", protect, OwnerController.updateOwner);

  // Definimos una ruta DELETE '/api/owner/:id' para eliminar un propietario específico por su ID.
  app.delete("/api/owner/:id", protect, OwnerController.deleteOwner);

  // Definimos una ruta POST '/api/owner/:ownerId/car/new' para crear un nuevo propietario.
  app.post(
    "/api/owner/:ownerId/car/new",
    protect,
    OwnerController.addCarToOwner
  );

  // Definimos una ruta GET '/api/owner/:ownerId/cars' para obtener todos los propietarios.
  app.get("/api/owner/:ownerId/cars", protect, OwnerController.getOwnerCars);

  // Definimos una ruta GET '/api/car/:carId' para obtener un propietario específico por su ID.
  app.get("/api/car/:carId", protect, OwnerController.getCarDetail);

  // Definimos una ruta PUT '/api/owner/:id' para actualizar un propietario específico por su ID.
  app.put(
    "/api/owner/:ownerId/car/:carId",
    protect,
    OwnerController.updateOwnerCar
  );

  // Definimos una ruta DELETE '/api/owner/:ownerId/car/:carId' para eliminar un propietario específico por su ID.
  app.delete(
    "/api/owner/:ownerId/car/:carId",
    protect,
    OwnerController.deleteCarFromOwner
  );
};
