import React from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";
import jwt from "jwt-decode";
import logo from "../Asset/Logo.png";
import "../Style/navigation.css";

function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

const Navigation = () => {
  //--------- régler l'affichage de la barre de navition en fonction du type d'utilisateur
  const token = getCookie("_auth");
  const user = jwt(token);
  const type = user.TypeId === 1;

  return (
    <div className="navigation">
      <ul className="menu">
        <img className="logoNav" src={logo} alt="logo" />
        <NavLink to="/slot" className="slot">
          <li>Slot</li>
        </NavLink>
        {type && (
          <NavLink to="/admin/newSlot" className="newslot">
            <li>Ajouter un créneau</li>
          </NavLink>
        )}
      </ul>
      <LogOut />
    </div>
  );
};

export default Navigation;
