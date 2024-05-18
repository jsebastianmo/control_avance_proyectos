const Ticket = require("../models/ticket");
const validator = require("validator");

const crear = async (req, res) => {
    try {
        console.log(req.body)
        const tituloValidator = !validator.isEmpty(req.body.titulo.trim());
        const descripcionValidator = !validator.isEmpty(req.body.descripcion.trim());
        if(!tituloValidator || !descripcionValidator){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha insertado la información"
            })
        }
        const entidad = new Ticket(req.body);
        const ticket = await entidad.save();
        if(!ticket){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido guardar el ticket"
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

const editar = async(req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if(!ticket){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha encontrado el ticket para actualizar"
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

const eliminar = async(req, res) => {
    const { id } = req.params;
    try {
        const ticket = await Ticket.findOneAndDelete({ _id: id });
        if(!ticket){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha encontrado el ticket para eliminar"
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
    editar,
    eliminar
}