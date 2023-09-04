import React from "react";
import { useState } from "react";
import axios from "axios";
import Ophtalmo from "../Asset/panneau.jpg";

const Signup = ({ onFormSwitch }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [sexe, setSexe] = useState();
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);

  const handleSubmitSingup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/signup", {
        name,
        surname,
        password,
        email,
        sexe,
      })
      .then((response) => {
        console.log(response);
        setIsSubmitted(false);
        setIsCreated(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        setIsSubmitted(true);
        if (err.response.status !== 500) {
          setError(err.response.data.error);
        } else {
          setError("erreur serveur");
        }
      });
  };

  const handleChange = (e) => {
    setCheckOne(true);
    setCheckTwo(false);
    setSexe("homme");
  };

  const handleChangeTwo = (e) => {
    setCheckOne(false);
    setCheckTwo(true);
    setSexe("femme");
  };
  return (
    <div>
      <img className="Panneau" src={Ophtalmo} alt="Ophtalmo" />
      <div className="container">
        <form action="" onSubmit={handleSubmitSingup}>
          <h1>Créer un compte</h1>
          {isSubmitted && <p className="info">{error}</p>}
          {isCreated && <p>Compte crée</p>}
          <div>
            <label htmlFor="name"> Nom </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name"> Prénom </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="sexe">
            <label htmlFor="homme" className="inputsexe">
              <input
                type="radio"
                name="sexe"
                value={sexe}
                checked={checkOne}
                onClick={handleChange}
              />
              Homme
            </label>

            <label htmlFor="femme" className="inputsexe">
              <input
                type="radio"
                name="sexe"
                value={sexe}
                checked={checkTwo}
                onClick={handleChangeTwo}
              />
              Femme
            </label>
          </div>
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
            Créer un compte
          </button>
        </form>
        <div className="btn" onClick={() => onFormSwitch("login")}>
          Se connecter
        </div>
      </div>
    </div>
  );
};
export default Signup;
