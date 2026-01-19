"use client";

import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function Window({
  title,
  children,
  className = "",
  icon,
}: WindowProps) {
  return (
    <div
      className={` bg-win98-gray flex flex-col ${className}`}
      style={{ minWidth: "200px" }}
    >
      <div className=" win98-gray">
        <div className="p-1 flex items-center gap-1 min-w-0 flex-1">
          {icon && (
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              {icon}
            </span>
          )}
          <span className="font-bold text-lg truncate">{title}</span>
        </div>
      </div>
      <div className="win98-window-body flex-1 overflow-auto">{children}</div>
    </div>
  );
}
