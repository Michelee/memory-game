"use client";

import React from "react";
import { getCardIconLabel } from "@/utils/getCardIconLabel";

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
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold h-16 w-16 rounded cursor-pointer flex items-center justify-center ${
        flipped && !matched ? "bg-orange-500" : ""
      } ${matched && flipped ? "bg-green-500 hover:bg-green-500" : ""}`}
      onClick={handleClick}
      disabled={disabled || matched}
    >
      {flipped || matched ? getCardIconLabel(value) : ""}
    </button>
  );
};

export default CardComponent;
