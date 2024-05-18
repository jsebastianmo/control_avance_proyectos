import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateLayout = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const navegar = useNavigate();

    const handleCerrar = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navegar("/signin")
    }
    return(
        <>
            {
                !(authToken === null || authToken === undefined || authToken == "") ? 
                (
                    <>
                        <img className="cerrar-sesion" src="../../iconos/cerrar.png" alt="cerrar" data-bs-toggle="modal" data-bs-target="#cerrarTicketModal"/>
                        <Outlet />
                    </>
                )
                :
                (
                    <Navigate to="/signup" />
                )
            }
            <div className="modal fade" id="cerrarTicketModal" tabIndex="-1" aria-labelledby="cerrarTicketModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cerrarTicketModalLabel"> Cerrar Sesión </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p> ¿Está seguro que desea cerrar su sesión? </p> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleCerrar()}>Aceptar</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivateLayout;