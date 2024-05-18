const { Schema, model } = require("mongoose");

const esquema = Schema({
    compania: {
        type: Schema.ObjectId,
        ref: "Compania"
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model("User", esquema, "users");