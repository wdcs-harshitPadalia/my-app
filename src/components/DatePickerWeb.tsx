import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
export default function DatePickerWeb({ selected, handleChange }) {
  const [date, setDate] = useState(selected && selected.split(" ")[0]);
  const [time, setTime] = useState(selected && selected.split(" ")[1]);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    console.log("selected date:", selected, date);
    if (!date || !time) return;
  }, [date, time]);

  function _handleChange(e) {
    // onChange();
    const value = e.target.value;
    const elid = e.target.id;
    let newStr;

    if ("elogdate" === elid) {
      setDate(value);
      newStr = new String("").concat(
        value || "0000-00-00",
        " ",
        time || "00:00"
      );
    } else if ("elogtime" === elid) {
      setTime(value);
      newStr = new String("").concat(
        date || "0000-00-00",
        " ",
        value || "00:00"
      );
    }
    handleChange(newStr);
  }

  return (
    <View
      style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
    >
      <input
        id="elogdate"
        ref={dateRef}
        value={date}
        onChange={_handleChange}
        type="date"
        style={{ flex: 0.5 }}
      />
      <input
        id="elogtime"
        ref={timeRef}
        value={time}
        onChange={_handleChange}
        type="time"
        style={{ flex: 0.5 }}
      />
    </View>
  );
}
