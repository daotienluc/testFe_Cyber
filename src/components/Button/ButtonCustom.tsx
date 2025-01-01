import React from "react";

interface ButtonProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string; // Chỉ áp dụng cho ButtonOutline
}

export const ButtonGhost: React.FC<ButtonProps> = ({
  content,
  icon,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="py-2 px-4 duration-200 hover:text-green-500"
    >
      {icon ? <span className="mr-2">{icon}</span> : null}
      {content}
    </button>
  );
};

export const ButtonOutline: React.FC<ButtonProps> = ({
  content,
  icon,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-3 font-semibold duration-200 border border-green-500 rounded-md hover:bg-green-600 hover:text-white ${className}`}
    >
      {content}
      {icon ? <span className="mr-2">{icon}</span> : null}
    </button>
  );
};
