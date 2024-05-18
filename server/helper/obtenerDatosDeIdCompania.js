const Proyecto = require("../models/proyecto");

const obtenerDatos = async (idCompania) => {
    const datosGeneral = await Proyecto.aggregate([
        {
          $lookup: {
            from: 'historiasUsuarios',
            let: { proyecto_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$proyecto', '$$proyecto_id'] }
                }
              },
              {
                $lookup: {
                  from: 'tickets',
                  localField: '_id',
                  foreignField: 'historia_usuario',
                  as: 'tickets'
                }
              }
            ],
            as: 'historiasUsuarios'
          }
        }
    ]);
    const datos = datosGeneral.filter(dato => dato.compania == idCompania);
    return datos;
}

module.exports = {
    obtenerDatos
}