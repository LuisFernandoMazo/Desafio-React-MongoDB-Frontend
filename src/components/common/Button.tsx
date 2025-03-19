import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-1/4 bg-gray-700 mt-1 text-white  hover:bg-black/20 transition-colors px-4 py-2 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
