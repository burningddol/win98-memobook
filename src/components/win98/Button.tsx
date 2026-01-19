"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "primary";
  size?: "default" | "small";
}

export default function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-win98 select-none transition-none relative bg-win98-gray shadow-win98-raised";

  const sizeClasses =
    size === "small"
      ? "px-2 py-0.5 min-w-[50px] text-xs"
      : "px-3 py-1 min-w-[75px] text-sm";

  const interactiveClasses = disabled
    ? ""
    : "active:shadow-win98-pressed active:pt-[5px] active:pb-[3px]";

  const disabledClasses = disabled
    ? "text-win98-gray-dark cursor-not-allowed [text-shadow:1px_1px_0_#ffffff]"
    : "";

  const focusClasses =
    variant === "primary"
      ? "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-black focus-visible:-outline-offset-4"
      : "focus-visible:outline-none";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${interactiveClasses} ${disabledClasses} ${focusClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {variant === "primary" && !disabled && (
        <span className="absolute inset-[3px] border border-black border-dotted opacity-0 focus-visible:opacity-100 pointer-events-none" />
      )}
      {children}
    </button>
  );
}
