"use client";

import React from "react";

interface CardComponentProps {
  value: string;
  flipped: boolean;
  matched: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const CardComponent = ({
  value,
  flipped,
  matched,
  disabled,
  handleClick,
}: CardComponentProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-12 rounded cursor-pointer  ${
        flipped && !matched ? "bg-orange-500" : ""
      } ${matched && flipped ? "bg-green-500 hover:bg-green-500" : ""}`}
      onClick={handleClick}
      disabled={disabled || matched}
    >
      {flipped || matched ? value : ""}
    </button>
  );
};

export default CardComponent;
