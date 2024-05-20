const express = require("express");
const cors = require("cors");

const { conection } = require("./database/conection.js");
const userRoute = require("./routes/user.js");
const ticketsRoute = require("./routes/ticket.js");
const historiasUsuarioRoute = require("./routes/historiasUsuario.js");
const proyectosRoute = require("./routes/proyecto.js");
const companiaRoute = require("./routes/compania.js");
const datosRoute = require("./routes/datos.js");

const app = express();

app.set('PORT', process.env.PORT || 3001);

conection();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ruta para los usuarios
app.use("/api/user", userRoute);
//ruta para los tickets
app.use("/api/tickets", ticketsRoute);
//ruta para las historias de usuario
app.use("/api/historiasUsuario", historiasUsuarioRoute);
//ruta para los proyectos
app.use("/api/proyectos", proyectosRoute);
//ruta para las compañias
app.use("/api/compania", companiaRoute);
//ruta para obtener los datos
app.use("/api/datos", datosRoute);

app.listen(app.get('PORT'), ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('PORT')}`);
})