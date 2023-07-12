'use client'

import React, { memo } from "react";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  selectedValue: string;
  handleChange: (e: string) => void;
}

const RadioButton = ({
  label,
  value,
  name,
  selectedValue,
  handleChange,
}: RadioButtonProps) => {
  return (
  <div className="flex text-left max-w-xs my-1 mr-8">
    <label htmlFor={name} className="mr-2">
      {label}
    </label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selectedValue === value}
      onChange={(e) => handleChange(e.target.value)}
      className="h-6 w-6 rounded-sm text-black p-4 cursor-pointer"
    />
  </div>
)};

export default memo(RadioButton)