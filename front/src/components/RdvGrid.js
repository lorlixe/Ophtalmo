import "../Style/grid.css";

const RdvGrid = (data) => {
  const allapointement = [];
  console.log(data);
  const week = data.allweek;
  const appointementData = data.slot.slot;
  appointementData.map((rdv, index) => {
    const startHour = new Date(rdv.start);
    const endHour = new Date(rdv.start);
    allapointement.push({
      HospitalId: rdv.HospitalId,
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
  });

  return (
    <div className="grid-container">
      {allapointement.map((i, index) => {
        return week.map((week, index) => {
          if (i.day === week.day) {
            return (
              <div className="grid-item" key={index}>
                <h4>Hôpital : {i.HospitalId}</h4>
                Début : {i.start} Fin : {i.end}
              </div>
            );
          }
        });
      })}
    </div>
  );
};

export default RdvGrid;
