import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import moment from "moment";

export default function DatePickerWeb({
  selected,
  handleChange,
  isPickOnlyDate,
  maximumDate,
}) {
  const [date, setDate] = useState(selected && selected.split(" ")[0]);
  const [time, setTime] = useState(selected && selected.split(" ")[1]);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    // console.log("selected date:", selected, date);
    if (!date || !time) return;
  }, [date, time]);

  function _handleChange(e) {
    // onChange();
    const value = e.target.value;
    const elid = e.target.id;
    let newStr;

    if ("elogdate" === elid) {
      setDate(value);
      if (isPickOnlyDate) {
        newStr = moment(value).format("DD MMMM YYYY");
      } else {
        newStr = new String("").concat(
          value || "0000-00-00",
          " ",
          time || "00:00"
        );
      }
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
        style={{ flex: 1 }}
        max={maximumDate && moment(maximumDate).format("YYYY-MM-DD")}
      />

      {!isPickOnlyDate && (
        <input
          id="elogtime"
          ref={timeRef}
          value={time}
          onChange={_handleChange}
          type="time"
          style={{ flex: 0.5 }}
        />
      )}
    </View>
  );
}
