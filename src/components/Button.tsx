"use client";

interface ButtonProps {
  label: string;
  classes?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({ label, classes, disabled, onClick }: ButtonProps) => (
  <button
    className={`font-bold h-12 rounded cursor-pointer ${classes} disabled:opacity-50 disabled:cursor-not-allowed`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);
