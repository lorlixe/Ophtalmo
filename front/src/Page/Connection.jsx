import axios from "axios";
import { useState } from "react";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sexe, setSexe] = useState();
  const [error, setError] = useState({});
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/user/login", { email, password })
      .then((response) => {
        console.log(response);
        setIsSubmitted(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitted(true);
        setError(err.response.data.error);
      });
    setEmail("");
    setPassword("");
  };

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
    setEmail("");
    setPassword("");
    setName("");
    setSurname("");
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
    console.log(checkOne);
  };

  return (
    <div className="container">
      {isUser && (
        <div className="login">
          <form action="" onSubmit={handleSubmitLogin}>
            <h3>Connexion</h3>
            {isSubmitted && <p>{error}</p>}

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
            <div>
              <input className="btn-submit" type="submit" value="Connexion" />
            </div>
          </form>
          <button onClick={(e) => setIsUser(false)}>Créer un compte</button>
        </div>
      )}
      {!isUser && (
        <div className="signup">
          <form action="" onSubmit={handleSubmitSingup}>
            <h3>Création de compte</h3>
            {isSubmitted && <p>{error}</p>}
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
              <label htmlFor="surname"> Prénom </label>
              <input
                type="text"
                name="surname"
                value={surname}
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
            <div>
              <input
                className="btn-submit"
                type="submit"
                value="Créer un compte"
              />
            </div>
          </form>
          <button onClick={(e) => setIsUser(true)}>Se connecter</button>
        </div>
      )}
    </div>
  );
}

export default App;
