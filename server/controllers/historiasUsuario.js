const HistoriaUsuario = require("../models/historiasUsuario");
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
        const entidad = new HistoriaUsuario(req.body);
        const historia = await entidad.save();
        if(!historia){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido guardar la historia"
            })
        }
        return res.status(200).json({
            status: "success",
            historia
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

const editar = async() => {
    const { id } = req.params;
    try {
        const historia = await HistoriaUsuario.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if(!historia){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha encontrado la historia para actualizar"
            })
        }
        return res.status(200).json({
            status: "success",
            ticket
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
    editar
}