import { useEffect, useState } from "react";
import "../Style/grid.css";
import axios from "axios";

const RdvGrid = (data) => {
  const allapointement = [];
  const [allHospital, setAllHospital] = useState([]);
  const date = data.date;
  const appointementData = data.slot.slot;
  appointementData.map((rdv, index) => {
    const startHour = new Date(rdv.start);
    const endHour = new Date(rdv.end);
    const hospital = allHospital.find((choice) => choice.id === rdv.hospitalId);
    // Vérifier si l'hôpital est trouvé avant d'accéder à sa propriété 'name'
    if (hospital) {
      allapointement.push({
        AppointementHospital: hospital.name,
        day: startHour.toLocaleDateString([], {
          month: "numeric",
          year: "numeric",
          day: "numeric",
        }),
        start: startHour.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end: endHour.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  });
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
  console.log(allapointement);
  console.log(date);

  return (
    <div className="grid-slot">
      {allapointement.map((i, index) => {
        if (i.day === date) {
          return (
            <div className="slot-date" key={index}>
              <h4>{i.AppointementHospital}</h4>
              <p>{i.start}</p>
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
