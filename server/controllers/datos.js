const { obtenerDatos } = require("../helper/obtenerDatosDeIdCompania");

const lista = async (req, res) => {
    const { idCompania } = req.params;
    try {
        const datos = await obtenerDatos(idCompania);
        if(!datos){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha podido encontrar datos"
            })
        }
        return res.status(200).json({
            status: "success",
            datos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            mensaje: "Internal server error"
        })
    }
}

module.exports = {
    lista
}