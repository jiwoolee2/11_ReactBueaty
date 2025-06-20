import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
registerLocale("ko", ko);
import "react-datepicker/dist/react-datepicker.css";

const Test = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [selectedDateTime2, setSelectedDateTime2] = useState(new Date());

  const handleTimeChange = (date) => {
    if (date.getMinutes() % 10 === 0) {
      setSelectedDateTime(date);
    } else {
      alert("10분 단위로만 선택할 수 있습니다.");
    }
  };

  return (
    <>
      <h1>Weekly Schedule</h1>

      <DatePicker
        selected={selectedDateTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="HH:mm"
        locale="ko"
      />

      <DatePicker
        selected={selectedDateTime2}
        onChange={(date) => setSelectedDateTime2(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="Time"
        dateFormat="HH:mm"
        locale="ko"
      />

      <div>{selectedDateTime - selectedDateTime2}</div>
    </>
  );
};

export default Test;
