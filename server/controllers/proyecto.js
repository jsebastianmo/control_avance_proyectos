const Proyecto = require("../models/proyecto");
const validator = require("validator");

const crear = async (req, res) => {
    try {
        const nombreValidator = !validator.isEmpty(req.body.nombre.trim());
        if(!nombreValidator){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha insertado la información"
            })
        }
        const entidad = new Proyecto(req.body);
        const proyecto = await entidad.save();
        if(!proyecto){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido guardar el proyecto"
            })
        }
        return res.status(200).json({
            status: "success",
            proyecto
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

const proyectos = async (req, res) => {
    const { idCompania } = req.params;
    try {
        const proyectos = await Proyecto.find({compania: idCompania});
        if(!user){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar proyectos"
            })
        }
        return res.status(200).json({
            status: "success",
            proyectos
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

module.exports = {
    crear,
    proyectos
}