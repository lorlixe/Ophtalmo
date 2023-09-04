import React from "react";
import { useEffect, useState } from "react";
import "../Style/grid.css";
import axios from "axios";
import jwt from "jwt-decode";

const PopUpRdv = (props) => {
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const token = getCookie("_auth");

  const user = jwt(token);
  const UserId = user.userId;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const [availablity, setAvailablity] = useState(true);

  function appointement() {
    axios
      .post(
        "http://localhost:8000/appointment",
        {
          UserId: UserId,
          SlotId: props.rdv.id,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setAvailablity(false);
        console.log(availablity);

        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        console.log(headers);
      });
  }

  return (
    <div>
      {availablity && (
        <button onClick={appointement}>prendre rendez-vous</button>
      )}
      {!availablity && <p> Vous avez pris rendez-vous sur ce créneau</p>}
    </div>
  );
};

export default PopUpRdv;
