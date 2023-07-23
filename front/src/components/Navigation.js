import React from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <LogOut />
        <NavLink to="/slot" className="slot">
          <li>Slot</li>
        </NavLink>
        <NavLink to="/admin/newSlot" className="newslot">
          <li>Ajouter un créneau</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
