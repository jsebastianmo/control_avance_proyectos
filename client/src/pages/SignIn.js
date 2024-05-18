import React, { useState } from 'react'
import useForm from '../hooks/useForm';
import { Global } from '../helper/Global';
import Peticion from '../helper/Peticion';
import { NavLink, useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [ mensajeError, setMensajeError ] = useState("");
  const [ cargando, setCargando ] = useState(false);
  const { formulario, changed } = useForm({});
  const navegar = useNavigate();

  const send = async (e) => {
      e.preventDefault();
      setCargando(true);
      const data = await Peticion(Global.url + "/user/login", "POST", formulario);
      setCargando(false);
      if(data.status === "success"){
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          navegar('/control');
      }else{
        setMensajeError("Datos incorrectos")
      }
  }

  return (
    <section className='signin container d-flex justify-content-center align-items-center'>
        {
            !cargando ? 
            (
                <form onSubmit={send}>
                    <h1 className='fs-4 text-center text-danger'> {mensajeError} </h1>
                    <h1 className='fs-3 text-center'> Sign In </h1>
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
                    <div className='d-flex justify-content-between'>
                        <input className="btn btn-primary mt-4" type="submit" value="Sign In" />
                        <NavLink to="/signup" className="btn btn-primary mt-4"> Sign Up </NavLink>
                    </div>
                </form>
            )
            :
            (
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )
        }
    </section>
  )
}

export default SignIn;