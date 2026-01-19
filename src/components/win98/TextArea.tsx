"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className = "", error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-win98 select-none">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`
            win98-sunken px-1 py-0.5 text-sm font-win98 resize-none
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

TextArea.displayName = "TextArea";

export default TextArea;
