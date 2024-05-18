const { Schema, model } = require("mongoose");

const esquema = Schema({
    nombre: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("Compania", esquema, "companias");