import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md transition font-medium";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  const sizes = {
    default: "px-4 py-2",
    icon: "w-9 h-9",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
