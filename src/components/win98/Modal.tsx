"use client";

import { ReactNode, useEffect, useCallback } from "react";
import Window from "./Window";

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
}

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
  icon,
  className = "",
  closeOnBackdrop = true,
}: ModalProps) {
  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdrop) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={handleBackdropClick}
      />
      {/* Modal Window */}
      <div className={`relative z-10 max-w-lg w-full mx-4 ${className}`}>
        <Window title={title} icon={icon}>
          {children}
        </Window>
      </div>
    </div>
  );
}
