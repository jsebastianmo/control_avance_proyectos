const { Schema, model } = require("mongoose");

const esquema = Schema({
    compania: {
        type: Schema.ObjectId,
        ref: "Compania"
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

module.exports = model("Proyecto", esquema, "proyectos");