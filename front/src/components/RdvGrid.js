import { useEffect, useState } from "react";
import "../Style/grid.css";
import axios from "axios";
import PopUpRdv from "./PopUpRdv";

const RdvGrid = (data) => {
  const [pop, setPop] = useState(0);
  const allapointement = [];
  const [allHospital, setAllHospital] = useState([]);

  const date = data.date;
  const appointementData = data.slot.slot;
  appointementData.map((rdv, index) => {
    const startHour = new Date(rdv.start);
    const hours = startHour.getUTCHours();
    const minutes = startHour.getUTCMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    const hospital = allHospital.find((choice) => choice.id === rdv.hospitalId);
    // Vérifier si l'hôpital est trouvé avant d'accéder à sa propriété 'name'
    if (hospital) {
      allapointement.push({
        id: rdv.id,
        availablity: rdv.availablity,
        AppointementHospital: hospital.name,
        day: startHour.toLocaleDateString([], {
          month: "numeric",
          year: "numeric",
          day: "numeric",
        }),
        start: formattedTime,
      });
    }
  });
  allapointement.sort((a, b) => (a.start > b.start ? 1 : -1));
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const token = getCookie("_auth");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  //------------------------------------------ afficher la liste des hôpitaux --------------------
  useEffect(() => {
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
  }, []);

  function popUp(index) {
    if (pop === 0 || pop !== index) {
      setPop(index);
    } else {
      setPop(0);
    }
  }
  return (
    <div className="grid-slot">
      {allapointement.map((i, index) => {
        if (i.day === date && i.availablity === true) {
          return (
            <div>
              <div className={"slot-date " + index} key={index}>
                <div className={index} onClick={() => popUp(index)}>
                  <h4>{i.AppointementHospital}</h4>
                  <p>{i.start}</p>
                  {pop === index && (
                    <div className="info">
                      <PopUpRdv rdv={i} key={index} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default RdvGrid;
