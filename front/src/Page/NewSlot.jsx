import React, { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewSlot = () => {
  const [allHospital, setAllHospital] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [start, setStart] = useState();

  const navigate = useNavigate();
  const [error, setError] = useState();

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const token = getCookie("_auth");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // afficher la liste d'hôpital
  useEffect(() => {
    if (isSubmitted === true) {
      navigate("/slot");
    }
    axios
      .get("http://localhost:8000/hospital", {
        headers: headers,
      })
      .then(({ data }) => {
        setAllHospital(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSubmitted]);

  // gestion du formulaire -- créer un créneau pour un rdv
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/slot",
        {
          hospitalId: selectedHospital.id,
          start: start,
        },
        { headers: headers }
      )
      .then((response) => {
        setIsSubmitted(true);
        console.log(response);
      })
      .catch((err) => {
        console.log(selectedHospital.id);
        console.log(err);
        setIsSubmitted(false);
        if (err.response.status !== 500) {
          setError(err.response.data.message);
        } else {
          setError("Le formulaire n'est pas complet");
        }
      });
  };
  console.log(start);
  return (
    <div>
      <Navigation />
      <h1>Ajouter un créneau</h1>
      <form className="dateHeureForm" action="" onSubmit={handleSubmit}>
        {!isSubmitted && <p className="info">{error}</p>}
        <label className="hospitalName"> Lieux de consultation:</label>
        <select
          type="text"
          id="hospitalName"
          name="hospitalName"
          onChange={(e) =>
            setSelectedHospital(
              allHospital.find((choice) => choice.name === e.target.value)
            )
          }
        >
          <option value="" selected disabled hidden>
            Choisir un hôpital
          </option>
          {allHospital.map((oneHospital, index) => (
            <option key={index}>{oneHospital.name}</option>
          ))}
        </select>
        <label className="dateHeure">Date et Heure:</label>
        <input
          type="datetime-local"
          id="dateHeure"
          name="dateHeure"
          onChange={(e) => setStart(e.target.value + "Z")}
        />
        <button className="btn-submit" type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default NewSlot;
