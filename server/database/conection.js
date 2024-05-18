const mongoose = require("mongoose");

const conection = async () => {
    try {
        const uri = 'mongodb://127.0.0.1:27017/control';
        await mongoose.connect(uri);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('No se ha establecido la conexión');
    }
}

module.exports = {
    conection
}