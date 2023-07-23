import RdvGrid from "./RdvGrid";
import "../Style/grid.css";
import { useEffect, useState } from "react";

export default function Calendar(slot) {
  const [firstDay] = useState(new Date());
  const [allweek, setAllWeek] = useState([]);
  let [nextdays, setNextDays] = useState(0);
  // --------------------------------------------changer de page du calendrier----------------------------------------
  function next() {
    setNextDays(nextdays + 7);
    console.log(nextdays);
  }

  function last() {
    nextdays > 0 ? setNextDays(nextdays - 7) : setNextDays(0);
    console.log(nextdays);
  }
  // --------------------------
  useEffect(() => {
    let week = [];
    // let dday = firstDay.getDay();
    const dayOfTheWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(firstDay.getDate() + (i + nextdays));
      week.push({
        index: i,
        day: dayOfTheWeek[date.getDay()],
        date: date.toLocaleDateString("fr").slice(0, 10),
      });
    }
    setAllWeek(week);
  }, [nextdays]);
  console.log(allweek);
  return (
    <div>
      <div className="nextPage">
        <button type="button" className="btn btn-link" onClick={last}>
          Précédent
        </button>
        <button type="button" className="btn btn-link" onClick={next}>
          Suivant
        </button>
      </div>
      <div className="grid-container">
        {allweek.map((week, index) => (
          <div className="grid-item" key={index}>
            {week.day} {week.date} <RdvGrid slot={slot} date={week.date} />
          </div>
        ))}
      </div>
    </div>
  );
}
