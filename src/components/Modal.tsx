import React, { useEffect, useRef } from "react";
import { ModalProps } from "../interfaces/";
import { createPortal } from "react-dom";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-4 rounded-lg max-w-md w-full m-4"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
