import { ToastContext } from ".";
import { useCallback, useMemo, useState } from "react";
import { Toast } from "../../interfaces/Toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.uniqueId !== id));
  }, []);

  const addToast = useCallback((message: string) => {
    const uniqueId = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    setToasts((prev) => [...prev, { uniqueId, message }]);
    setTimeout(() => removeToast(uniqueId), 1000);
  }, []);

  const value = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.uniqueId}
            onClick={() => removeToast(toast.uniqueId)}
            className={
              "p-4 mb-2 rounded-lg cursor-pointer text-white bg-blue-400"
            }
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
