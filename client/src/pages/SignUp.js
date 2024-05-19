import React, { useState } from 'react'
import Peticion from '../helper/Peticion';
import { Global } from '../helper/Global';
import useForm from '../hooks/useForm';
import { NavLink, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const { formulario, changed } = useForm();

    const [companias, setCompanias] = useState([]);
    const [mensajeContraseña, setMensajeContraseña] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    const navegar = useNavigate();

    const obtenerCompanias = async () => {
        const data = await Peticion(Global.url + "/compania/companias", "GET");
        setCompanias(data.companias)
    }

    obtenerCompanias();

    const send = async (e) => {
        e.preventDefault();
        if(formulario.name === undefined || formulario.surname === undefined || formulario.email === undefined){
            setMensajeError("El formulario tiene campos vacios");
        }else{
            if(formulario.password !== formulario.retryPassword){
                setMensajeContraseña("Las contraseñas no coinciden");
            }else{
                const data = await Peticion(Global.url + "/user/register", "POST", formulario);
                if(data.status === "success"){
                    navegar("/signin");
                    setMensajeContraseña("");
                    setMensajeError("");
                }else{
                    setMensajeError("Errores en el formulario");
                }
            }
        }
    }

    const handleLimpiar = () => {
        setMensajeContraseña("");
        setMensajeError("");
    }

  return (
    <section className='signup container d-flex justify-content-center align-items-center'>
        <form onSubmit={send} onClick={handleLimpiar}>
            <h1 className='fs-4 text-center text-danger'> {mensajeError} </h1>
            <h1 className='fs-3 text-center'> Sign Up </h1>
            <div className="row g-3 mt-4">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First name" aria-label="First name" name='name' onChange={changed}/>
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" name='surname' onChange={changed}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <input type="email" className="form-control" placeholder="Email" aria-label="Email" name='email' onChange={changed}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <input type="password" className="form-control" placeholder="Password" aria-label="Password" name='password' onChange={changed}/>
                </div>
            </div>
            <h1 className='fs-4 text-danger'> { mensajeContraseña } </h1>
            <div className="row mt-4">
                <div className="col">
                    <input type="password" className="form-control" placeholder="Retry Password" aria-label="Retry Password" name='retryPassword' onChange={changed}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='compania' onChange={changed}>
                        {
                            companias.map((compania, index) => (
                                <option key={index} value={compania._id}>{compania.nombre}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <input className="btn btn-primary mt-4" type="submit" value="Sign Up" />
                <NavLink to="/signin" className="btn btn-primary mt-4"> Sign In </NavLink>
            </div>
        </form>
    </section>
  )
}

export default SignUp;