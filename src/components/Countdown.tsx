// create a react component that is a countdown timer
import React, { useEffect, useState } from "react";

import { ClockIcon } from "./Icons/ClockIcon";

interface CountdownProps {
  seconds: number;
  setTimeOut: () => void;
  handleCountdown: (timer: number) => void;
}

const Countdown = ({
  seconds,
  setTimeOut,
  handleCountdown,
}: CountdownProps) => {
  const [label, setLabel] = useState("0:00");

  const convertSecondsToTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = time % 60 < 10 ? `0${time % 60}` : time % 60;
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (seconds === 0) {
      setTimeOut();
    }

    const interval = setInterval(() => {
      setLabel(convertSecondsToTime(seconds - 1));
      handleCountdown(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [handleCountdown, seconds, setTimeOut]);

  return (
    <div
      className={`text-xl mx-auto p-4 rounded-sm mt-4 flex items-center ${
        seconds < 10 ? "text-red-600" : ""
      }`}
    >
      <ClockIcon fill={seconds < 10 ? "red" : "white"} /> <span className="ml-4">{label}</span>
    </div>
  );
};

export default Countdown;
