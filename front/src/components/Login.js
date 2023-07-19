import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

const Login = ({ onFormSwitch }) => {
  const signIn = useSignIn();
  const [isSubmitted, setIsSubmitted] = useState();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted === true) {
      navigate("/slot");
    }
  }, [isSubmitted]);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((response) => {
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: email },
        });
        console.log(response);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitted(false);
        if (err.response.status !== 500) {
          setError(err.response.data.error);
        } else {
          setError("erreur serveur");
        }
      });
  };
  return (
    <div>
      <div className="container">
        <form action="" onSubmit={handleSubmitLogin}>
          <h1>Se connecter</h1>
          {!isSubmitted && <p className="info">{error}</p>}
          <div>
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"> Mot de passe </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-submit" type="submit">
            Connexion
          </button>
        </form>
        <div className="btn" onClick={() => onFormSwitch("signup")}>
          créer un compte
        </div>
      </div>
    </div>
  );
};
export default Login;
