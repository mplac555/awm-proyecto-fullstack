// Importamos el modelo 'Propietario' que contiene el esquema y la funcionalidad para interactuar con la colección de propietarios en la base de datos.
const Owner = require("../models/propietario.model.js");
// Importamos el modelo 'Car' que contiene el esquema y la funcionalidad para interactuar con la colección de autos en la base de datos
const Car = require("../models/auto.model.js");

// Controlador para crear un nuevo propietario en la base de datos.
module.exports.createOwner = (request, response) => {
  console.log(request.body); // Imprimimos en la consola el cuerpo de la solicitud recibida (datos del nuevo propietario).
  const { ownerName, ownerLastname, ownerDNI, ownerPhone } = request.body; // Extraemos el ownerName, ownerLastname, ownerDNI y pwnerPhone del cuerpo de la solicitud.
  Owner.create({
    ownerName,
    ownerLastname,
    ownerDNI,
    ownerPhone,
  })
    .then((user) => response.json(user)) // Si se crea correctamente, devolvemos el nuevo propietario en formato JSON como respuesta.
    .catch((err) => response.status(400).json(err)); // Si ocurre un error, devolvemos el error en formato JSON con un código de estado 400 (solicitud incorrecta).
};

// Controlador para obtener todos los propietarios de la base de datos, ordenados por nombre de forma ascendente.
module.exports.getAllOwners = (_, response) => {
  Owner.find({})
    .sort({ ownerName: 1, ownerLastname: 1 }) // Ordenamos por 'ownerName' y 'ownerLastname' en orden alfabético ascendente (1).
    .then((authors) => response.json(authors)) // Devolvemos todos los propietarios encontrados en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para obtener un propietario específico de la base de datos según su ID.
module.exports.getOwner = (request, response) => {
  Owner.findOne({ _id: request.params.id }) // Buscamos un propietario por su ID proporcionado en los parámetros de la URL.
    .then((user) => response.json(user)) // Devolvemos el propietario encontrado en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para eliminar un propietario de la base de datos según su ID.
module.exports.deleteOwner = (request, response) => {
  Owner.deleteOne({ _id: request.params.id }) // Buscamos y eliminamos el propietario por su ID proporcionado en los parámetros de la URL.
    .then((userDeleted) => response.json(userDeleted)) // Devolvemos el resultado de la eliminación en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

module.exports.updateOwner = (request, response) => {
  Owner.findOneAndUpdate({ _id: request.body._id }, request.body, {
    new: true,
  })
    .then((owner) => response.json(owner))
    .catch((err) => response.json(err));
};

// Controlador para agregar un vehículo a un propietario por su ID.
module.exports.addCarToOwner = (request, response) => {
  const ownerId = request.params.ownerId; // ID del propietario proporcionado en los parámetros de la URL.
  const { carBrand, carColor, carStatus, carPlate } = request.body; // Datos del vehículo proporcionados en el cuerpo de la solicitud.

  // Crear el nuevo vehículo en la colección de autos.
  Car.create({
    carBrand,
    carColor,
    carStatus,
    carPlate,
  })
    .then((newCar) => {
      // Encontrar el propietario por su ID y agregar el ID del nuevo vehículo a ownerCars.
      Owner.findByIdAndUpdate(
        ownerId,
        { $push: { ownerCars: newCar._id } },
        { new: true }
      )
        .then((ownerWithCar) => response.json(ownerWithCar)) // Devolver el propietario actualizado con el nuevo vehículo.
        .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolver el error en formato JSON.
    })
    .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolver el error en formato JSON.
};

// Controlador para obtener el listado de vehículos de un propietario por su ID.
module.exports.getOwnerCars = (request, response) => {
  const ownerId = request.params.ownerId; // ID del propietario proporcionado en los parámetros de la URL.

  Owner.findById(ownerId) // Buscamos el propietario por su ID.
    .populate("ownerCars") // Cargamos los detalles de los autos relacionados.
    .then((owner) => {
      if (!owner) {
        return response
          .status(404)
          .json({ message: "Propietario no encontrado" });
      }
      return response.json(owner.ownerCars); // Devolvemos la lista de vehículos del propietario en formato JSON.
    })
    .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para eliminar un auto de un propietario por su ID.
module.exports.deleteCarFromOwner = (request, response) => {
  //   const ownerId = request.params.ownerId; // ID del propietario proporcionado en los parámetros de la URL.
  //   const carId = request.params.carId; // ID del auto proporcionado en los parámetros de la URL.

  Car.findOneAndDelete({ _id: request.params.carId })
    .then((ans) => response.json(ans))
    .catch((err) => response.json(err));

  //   // Buscar el propietario por su ID.
  //   Owner.findById(ownerId)
  //     .then((owner) => {
  //       if (!owner) {
  //         return response
  //           .status(404)
  //           .json({ message: "Propietario no encontrado" });
  //       }

  //       // Filtrar y eliminar el ID del auto de ownerCars.
  //       owner.ownerCars = owner.ownerCars.filter(
  //         (car) => car.toString() !== carId
  //       );

  //       // Guardar el propietario actualizado.
  //       return owner.save();
  //     })
  //     .then((updatedOwner) => {
  //       // Eliminar el auto de la colección de autos.
  //       return Car.findByIdAndDelete(carId)
  //         .then(() => response.json(updatedOwner)) // Devolver el propietario actualizado en formato JSON.
  //         .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolver el error en formato JSON.
  //     })
  //     .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolver el error en formato JSON.
};

// Controlador para obtener el detalle de un vehículo en específico según su ID.
module.exports.getCarDetail = (request, response) => {
  const carId = request.params.carId; // ID del vehículo proporcionado en los parámetros de la URL.

  Car.findById(carId) // Buscamos el vehículo por su ID.
    .then((car) => {
      if (!car) {
        return response.status(404).json({ message: "Vehículo no encontrado" });
      }
      return response.json(car); // Devolvemos el detalle del vehículo en formato JSON como respuesta.
    })
    .catch((err) => response.status(500).json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

module.exports.updateOwnerCar = (request, response) => {
  Car.findOneAndUpdate({ _id: request.params.carId }, request.body, {
    new: true,
  })
    .then((car) => response.json(car))
    .catch((err) => response.json(err));
};
