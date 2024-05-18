import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ({datos}) => {

  return (
    <section className="container mt-5">
      <nav className="menu">
        <ul className="menu-items">
          <li className="menu-items-item">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Proyectos
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul className="menu-proyectos">
                      {
                        datos.map( (proyecto, index) => (
                          <li key={index}> <NavLink to={'/control/home/' + proyecto._id}> {proyecto.nombre} </NavLink> </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Menu;
