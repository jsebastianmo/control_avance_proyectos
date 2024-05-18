const Compania = require("../models/compania");
const validator = require("validator");

const companias = async (req, res) => {
    try {
        const companias = await Compania.find();
        if(!companias){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar companias"
            })
        }
        return res.status(200).json({
            status: "success",
            companias
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

const compania = async (req, res) => {
    const { id } = req.params;
    try {
        const compania = await Compania.findById(id);
        if(!compania){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar la compania"
            })
        }
        return res.status(200).json({
            status: "success",
            compania
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

const crear = async (req, res) => {
    try {
        const nombreValidator = !validator.isEmpty(req.body.nombre.trim());
        if(!nombreValidator){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha insertado la información"
            })
        }
        const entidad = new Compania(req.body);
        const compania = await entidad.save();
        if(!compania){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido guardar la compañia"
            })
        }
        return res.status(200).json({
            status: "success",
            compania
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
    companias,
    compania
}