'use client'

interface InputComponentProps {
  label: string
  name: string
  value: string
  handleChange: (e: string) => void
}

export const InputComponent = ({ label, value, name, handleChange }: InputComponentProps) => (
  <div className="flex flex-col text-left max-w-xs my-3 mx-auto relative">
    <label htmlFor={name} className="mr-2 mb-2 font-bold">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className="h-8 rounded-sm text-black p-2"
    />
  </div>
);
