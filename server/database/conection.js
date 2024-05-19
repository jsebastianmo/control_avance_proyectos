const mongoose = require("mongoose");

const conection = async () => {
    try {
        const uri = 'mongodb+srv://jhonsmosqueraocampo:60GwMJVe9tj2VEu5@cluster0.49m95vv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(uri, options);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('No se ha establecido la conexión');
    }
}

module.exports = {
    conection
}