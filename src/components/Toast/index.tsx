import { createContext, useContext } from "react";
import { Toast } from "../../interfaces/Toast";

type ToastContextType = {
  toasts: Array<Toast>;
  removeToast: (id: string) => void;
  addToast: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error(
      "The useToast hook can only be used inside a ToastProvider."
    );

  return context;
};

export default useToast;
