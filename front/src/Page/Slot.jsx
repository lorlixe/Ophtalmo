import React, { useEffect, useState } from "react";
// // import Card from "../Components/Card";
import Navigation from "../Components/Navigation";
import axios from "axios";
import Calendar from "../Components/Calendar";

const Slot = () => {
  const [slot, setSlot] = useState([]);
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const token = getCookie("_auth");
  useEffect(() => {
    axios
      .get("http://localhost:8000/slot", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        setSlot(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navigation />
      <div className="booking-space">
        <h1>Bienvenu sur l'espace réservation du docteur XX</h1>
        <p>Choissiez un crénneau pour un rendez-vous</p>
        <div className="slot-container">
          <Calendar slot={slot} />
        </div>
      </div>
    </div>
  );
};

export default Slot;
