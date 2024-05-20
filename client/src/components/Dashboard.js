import React, { useRef, useState } from "react";
import useProyecto from "../hooks/useProyecto";
import Peticion from "../helper/Peticion";
import { Global } from "../helper/Global";
import { useNavigate } from "react-router-dom";

const Dashboard = ({idProyecto, datos, ObtenerDatos}) => {
    

  const { obtenerProyecto } = useProyecto(datos);
  const [ proyecto, setProyecto ] = useState(obtenerProyecto(idProyecto));
  const [ ticket, setTicket ] = useState({});
  const [ user ] = useState(JSON.parse(localStorage.getItem('user')));
  const [ historiaNueva, setHistoriaNueva ] = useState("");
  const [ historiaId, setHistoriaId ] = useState("");
  const tituloInput = useRef();
  const descripcionInput = useRef();
  const tituloInputCrear = useRef();
  const descripcionInputCrear = useRef();
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  useEffect(() => {
      setProyecto(obtenerProyecto(idProyecto));
  }, [idProyecto])

  const token = localStorage.getItem('token');
//   setUser(JSON.parse(localStorage.getItem('user')));

  const handleIdHistoriaTicket = (id) => {
    setHistoriaId(id);
  }

  const handleCrear = async () => {
    const objetoTicket = {
        historia_usuario: historiaId,
        titulo: tituloInputCrear.current.value,
        descripcion: descripcionInputCrear.current.value,
        estado: 'En curso'
    }
    setCargando(true);
    
    const data = await Peticion(Global.url + "/tickets/crear", "POST", objetoTicket, token);
    if(data.status === "success"){
        tituloInputCrear.current.value="";
        descripcionInputCrear.current.value="";
        await ObtenerDatos();
        navegar("/control/home/" + proyecto._id)
        setCargando(false);
    }else{
        // datos = []
    }
  }

  const handleEditar = async () => {
    const objetoTicket = {
        titulo: tituloInput.current.value,
        descripcion: descripcionInput.current.value,
        encargado: ticket.encargado,
        estado: ticket.estado
    }
    setCargando(true);
    const data = await Peticion(Global.url + "/tickets/editar/" + ticket._id, "PUT", objetoTicket, token);
    setCargando(false);
    if(data.status === "success"){
        await ObtenerDatos();
        navegar("/control/home/" + proyecto._id)
    }else{
        // datos = []
    }
  }

  const handleEliminar = async (id) => {
    setCargando(true);
    const data = await Peticion(Global.url + "/tickets/eliminar/" + ticket._id, "DELETE", "", token);
    if(data.status === "success"){
        setCargando(false);
        setTicket({})
        await ObtenerDatos();
        navegar("/control/home/" + proyecto._id)
        setCargando(false);
    }else{
        // datos = []
    }
  }

  const handleNuevoTicket = async() => {
    const objetoHistoria = {
        nombre: historiaNueva,
        proyecto: proyecto._id
    }
    setCargando(true);
    const data = await Peticion(Global.url + "/historiasUsuario/crear", "POST", objetoHistoria, token);
    if(data.status === "success"){
        await ObtenerDatos();
        navegar("/control/home/" + proyecto._id)
        setCargando(false);
    }else{
        // datos = []
    }
  }

  const handleEditarModal = (t) => {
    setTicket(t)
  }

  return (
    <section className="dashboard container mt-5 bg-light p-5">
      <h1 className="fs-4"> { proyecto.nombre } </h1>
      <div className="row">
        <div className="col-9">
            <h1 className="fs-3 text-muted"> { user.name } </h1>
        </div>
      </div>
      {
        cargando ? 
        (
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
        :
        (
            <>
            <div className="historias-usuario accordion accordion-flush mt-5" id="accordionFlushExample">
        {
            proyecto.historiasUsuarios.map( (historia, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={'flush-headingTwo'+index}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#flush-collapseTwo'+index} aria-expanded="false" aria-controls={'#flush-collapseTwo'+index}>
                            { historia.nombre } <span className="badge bg-danger"> { historia.tickets.length } </span>
                        </button>
                    </h2>
                    <div id={'flush-collapseTwo'+index} className="accordion-collapse collapse show" aria-labelledby={'flush-headingTwo'+index} data-bs-parent="#accordionFlushExample">
                        <ul className="list-group list-group-flush">
                            {
                                historia.tickets.map((ticket, index1) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light" key={index1}>
                                        <div className="contenido-ticket d-flex align-items-center gap-5">
                                            <span> { ticket.titulo } </span>
                                            <div className="acciones">
                                                <img src="../../iconos/editar.png" alt="editar" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditarModal(ticket)}/>
                                                <img src="../../iconos/eliminar.png" alt="cancelar" data-bs-toggle="modal" data-bs-target="#cancelarTicketModal" onClick={()=>setTicket(ticket)}/>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-1">
                                            <span className="badge bg-info">{ ticket.encargado === "" ? 'Sin encargador' : ticket.encargado }</span>
                                            <span className={ticket.estado === 'En curso' ? 'badge bg-primary' : ticket.estado === 'Finalizada' ? 'badge bg-success' : 'badge bg-secondary'}>{ ticket.estado }</span>
                                        </div>
                                    </li>
                                ))
                            }
                            <li className="list-group-item bg-light">
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#crearTicketModal" onClick={() => handleIdHistoriaTicket(historia._id)}> Crear Ticket </button>
                            </li>
                        </ul>
                    </div>
                </div>
            ))
        }
      </div>
      <div className="form-floating mt-5">
        <input type="text" className="form-control nueva_historia_usuario" id="floatinghistoria" placeholder="Nueva historia de usuario" onChange={(e) => setHistoriaNueva(e.target.value)} onBlur={()=>handleNuevoTicket()}/>
        <label htmlFor="floatinghistoria">Nueva Historia de Usuario...</label>
      </div>
            </>
        )
      }

      {/* Modal editar ticket */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    Edición del ticket
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputTituloTicket" placeholder="titulo del ticket" defaultValue={ticket.titulo} ref={tituloInput}/>
                        <label htmlFor="floatingInputTituloTicket">Titulo</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="descripción del ticket" id="floatingTextarea2" defaultValue={ticket.descripcion} ref={descripcionInput}></textarea>
                        <label htmlFor="floatingTextarea2">Descripción del ticket</label>
                    </div> 
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleEditar()}>Editar</button>
            </div>
            </div>
        </div>
      </div>

      {/* Modal para confirmar eliminación del ticket */}
      <div className="modal fade" id="cancelarTicketModal" tabIndex="-1" aria-labelledby="cancelarTicketModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="cancelarTicketModalLabel"> { ticket.titulo } </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p> ¿Está seguro que desea cancelar el ticket? </p> 
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleEliminar(ticket._id)}>Aceptar</button>
            </div>
            </div>
        </div>
      </div>

      {/* Modal para crear ticket */}
      <div className="modal fade" id="crearTicketModal" tabIndex="-1" aria-labelledby="crearTicketModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="crearTicketModalLabel">
                    Crear ticket
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputTituloTicketCrear" placeholder="titulo del ticket" ref={tituloInputCrear}/>
                        <label htmlFor="floatingInputTituloTicketCrear">Titulo</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="descripción del ticket" id="floatingTextarea2" ref={descripcionInputCrear}></textarea>
                        <label htmlFor="floatingTextarea2">Descripción del ticket</label>
                    </div> 
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleCrear()}>Crear</button>
            </div>
            </div>
        </div>
      </div>
    </section> 
  );
};

export default Dashboard;
