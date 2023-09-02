const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carBrand: {
        type: String,
        required: [true, 'La marca del auto es necesaria']
    },
    carColor: {
        type: String,
        required: [true, 'El color del auto es necesario']
    },
    carStatus: {
        type: String,
        enum: ['Comunidad', 'Invitado'] // Opciones válidas para el estado del vehículo
    },
    carPlate: {
        type: String,
        required: [true, 'La placa del auto es requerida'],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos el formato de placa: tres letras y cuatro números (ejemplo: ABC1234).
                const plateRegex = /^[A-Za-z]{3}\d{4}$/;
                return plateRegex.test(value);
            },
            message: 'La placa del vehículo no tiene el formato adecuado'
        }
    }    
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
