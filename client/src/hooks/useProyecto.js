
const useProyecto = (datos) => {

    const obtenerProyecto = (idProyecto) => {
        let proyectoObtenido = {};
        datos.map(proyecto => {
            if(proyecto._id == idProyecto){
                proyectoObtenido = proyecto;
            }
        })
        return proyectoObtenido;
    }

  return {
    obtenerProyecto
  }
}

export default useProyecto;