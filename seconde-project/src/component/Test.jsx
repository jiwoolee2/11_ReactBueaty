import { useState } from "react";

const Test = () => {
  // const [monday, setMonday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [tuesday, setTuesday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [wednesday, setWednesday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [thursday, setThursday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [friday, setFriday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [saturday, setSaturday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);
  // const [sunday, setSunday] = useState([
  //   { startTime: "09:00", endTime: "18:00" },
  // ]);

  const [resInfo, setResInfo] = useState({
    monday: [{ startTime: "09:00", endTime: "18:00" }],
    tuesday: [{ startTime: "09:00", endTime: "18:00" }],
    wednesday: [{ startTime: "09:00", endTime: "18:00" }],
    thursday: [{ startTime: "09:00", endTime: "18:00" }],
    friday: [{ startTime: "09:00", endTime: "18:00" }],
    saturday: [{ startTime: "09:00", endTime: "18:00" }],
    sunday: [{ startTime: "09:00", endTime: "18:00" }],
  });

  // const weeklySchedules = [
  //   monday,
  //   tuesday,
  //   wednesday,
  //   thursday,
  //   friday,
  //   saturday,
  //   sunday,
  // ];
  // const setWeeklySchedules = [
  //   setMonday,
  //   setTuesday,
  //   setWednesday,
  //   setThursday,
  //   setFriday,
  //   setSaturday,
  //   setSunday,
  // ];
  // const dayLabels = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const addHandler = (dayIndex) => {
    setWeeklySchedules[dayIndex]((prev) => [
      ...prev,
      { startTime: "09:00", endTime: "18:00" },
    ]);
  };

  const deleteHandler = (dayIndex, timeIndex) => {
    setWeeklySchedules[dayIndex]((prev) =>
      prev.filter((_, i) => i !== timeIndex)
    );
  };

  const handleStartTime = (e, dayIndex, timeIndex) => {
    const newTime = e.target.value;
    setWeeklySchedules[dayIndex]((prev) =>
      prev.map((slot, i) =>
        i === timeIndex ? { ...slot, startTime: newTime } : slot
      )
    );
  };

  const handleEndTime = (e, dayIndex, timeIndex) => {
    const newTime = e.target.value;
    setWeeklySchedules[dayIndex]((prev) =>
      prev.map((slot, i) =>
        i === timeIndex ? { ...slot, endTime: newTime } : slot
      )
    );
  };

  return (
    <>
      <h1>Weekly Schedule</h1>
      <div>
        {weeklySchedules.map((i, dayIndex) => (
          <div key={dayIndex} style={{ marginBottom: "20px" }}>
            <h3>{dayLabels[dayIndex]}</h3>
            <button onClick={() => addHandler(dayIndex)}>추가하기</button>
            {i.map((j, timeIndex) => (
              <div key={timeIndex}>
                <button onClick={() => deleteHandler(dayIndex, timeIndex)}>
                  삭제
                </button>
                <input
                  type="time"
                  value={j.startTime}
                  onChange={(e) => handleStartTime(e, dayIndex, timeIndex)}
                />
                <input
                  type="time"
                  value={j.endTime}
                  onChange={(e) => handleEndTime(e, dayIndex, timeIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
