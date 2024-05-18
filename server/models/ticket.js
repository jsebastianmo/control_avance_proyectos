const { Schema, model } = require("mongoose");

const esquema = Schema({
    historia_usuario: {
        type: Schema.ObjectId,
        ref: "HistoriaUsuario"
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    encargado: {
        type: Schema.ObjectId,
        ref: "User"
    },
    estado: {
        type: String,
        default: 'En curso'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("Ticket", esquema, "tickets");