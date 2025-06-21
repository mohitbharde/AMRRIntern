import type { ReactElement } from "react";

interface buttonPors {
  text: string;
  variant: "primary" | "secondary";
  icon?: ReactElement;
  onClick?: () => void;
}

const common =
  "px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition";
const variantStyle = {
  primary: `bg-blue-600 hover:bg-blue-700 text-white ${common}`,
  secondary: `bg-white hover:bg-gray-100 text-blue-700 border border-blue-600 ${common}`,
};

export const Button = ({ variant, text, onClick, icon }: buttonPors) => {
  return (
    <button className={variantStyle[variant]} onClick={onClick}>
      {text}
      {icon}
    </button>
  );
};
