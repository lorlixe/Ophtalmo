import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className="Connexion">
          <li>Connexion</li>
        </NavLink>
        <NavLink to="/slot" className="slot">
          <li>Slot</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
