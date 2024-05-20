import { NavLink, useParams } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Peticion from "../helper/Peticion";
import { Global } from "../helper/Global";

const Home = () => {

  const [datos, setDatos] = useState([]);
  const params = useParams();

  const ObtenerDatos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const compania = user.compania;
      const token = localStorage.getItem('token');
      const data = await Peticion(Global.url + "/datos/lista/" + compania, "GET", "", token);
      if(data.status === "success"){
        setDatos(data.datos)
      }else{
          setDatos([])
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    ObtenerDatos();
  }, [datos])
  

  return (
    <section className="container">
      {
        params.id === "" || params.id === undefined ? 
        (
          <>
            <h1 className="fs-4 text-center mt-5 mb-5"> Proyectos activos </h1>
            <ul className="menu-proyectos d-flex justify-content-aroud align-items-center gap-5">
              {
                datos.length>0 &&
                  datos.map( (proyecto, index) => (
                    <li key={index}> <NavLink to={'home/' + proyecto._id}> {proyecto.nombre} </NavLink> </li>
                  ))
              }
            </ul>
          </>
        )
        :
        (
          <>
            <h1 className="fs-2 text-center mt-5"> { datos.compañia } </h1>
            <div className="row">
              <div className="col-3">
                <Menu datos={datos} />
              </div>
              <div className="col-9">
                <Dashboard idProyecto = {params.id} datos={datos} ObtenerDatos={ObtenerDatos}/>
              </div>
            </div>
          </>
        )
      }
    </section>
  );
};

export default Home;
