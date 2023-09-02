const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    alertaDate: {
        type: String,
        required: [true, 'La fecha de alerta es requerida'],
        validate: {
            validator: function (value) {
                // Validamos que la fecha tenga el formato 'YYYY-MM-DD'.
                const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
                return dateFormat.test(value);
            },
            message: 'El formato de la fecha debe ser "YYYY-MM-DD".'
        }
    },
    alertaHour: {
        type: String,
        required: [true, 'La hora de alerta es requerida'],
        validate: {
            validator: function (value) {
                // Validamos que la hora tenga el formato 'HH:MM:SS'.
                const hourFormat = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
                return hourFormat.test(value);
            },
            message: 'El formato de la hora debe ser "HH:MM:SS".'
        }
    },
    brigName: {
        type: String,
        required: [true, "El nombre del Brigadista es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el nombre tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El nombre del Brigadista debe tener entre cuatro y diez caracteres.'
        }
    },
    brigLastname: {
        type: String,
        required: [true, "El apellido del Brigadista es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el apellido tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El apellido del Brigadista debe tener entre cuatro y diez caracteres.'
        }
    },
    carPlate: {
        type: String,
        required: [true, 'La placa del auto es requerida'],
        validate: {
            validator: function (value) {
                // Validamos el formato de placa: tres letras y cuatro números (ejemplo: ABC1234).
                const plateRegex = /^[A-Za-z]{3}\d{4}$/;
                return plateRegex.test(value);
            },
            message: 'La placa del vehículo no tiene el formato adecuado'
        }
    },
    alertaIncident: {
        type: String,
        required: [true, "Se requiere especificar un tipo de incidente"],
    },
    alertaDescription: {
        type: String,
        maxlength: 140 // Limitamos el campo a 140 caracteres.
    }
});

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;
