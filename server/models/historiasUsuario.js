const { Schema, model } = require("mongoose");

const esquema = Schema({
    proyecto: {
        type: Schema.ObjectId,
        ref: "Proyecto"
    },
    nombre: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("HistoriaUsuario", esquema, "historiasUsuarios");