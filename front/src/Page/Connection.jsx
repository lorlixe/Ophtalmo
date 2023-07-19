import { useState } from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
function Connexion() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggelForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div>
      <div className="login-page">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggelForm} />
        ) : (
          <Signup onFormSwitch={toggelForm} />
        )}
      </div>
    </div>
  );
}
export default Connexion;
