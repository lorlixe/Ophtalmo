import React from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/");
  };
  return (
    <div>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

export default LogOut;
