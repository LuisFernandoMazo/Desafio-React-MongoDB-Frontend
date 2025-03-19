import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  value: string;
  name?: string;
  title?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "Escribe algo...",
  className,
  title,
  disabled,
}: InputProps) => {
  return (
    <div>
      <p>{title} </p>
      <input
        disabled={disabled}
        type={type}
        value={type === "money" ? value : value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-md ${className}`}
      />
    </div>
  );
};
