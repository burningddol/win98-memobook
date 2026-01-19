"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xl font-win98 select-none">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            win98-sunken px-1 py-0.5 text-xl font-win98
            focus:outline-none
            disabled:bg-win98-gray disabled:text-win98-gray-dark disabled:cursor-not-allowed
            ${error ? "bg-red-50" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
