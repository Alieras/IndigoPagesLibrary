import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  const isSuccess = type === "success";

  return (
    <div
      role="alert"
      className="fixed right-6 top-6 z-50 flex w-full max-w-sm items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg"
    >
      <div
        className={`mt-0.5 ${
          isSuccess
            ? "text-[var(--color-success)]"
            : "text-[var(--color-danger)]"
        }`}
      >
        {isSuccess ? (
          <CheckCircle size={21} />
        ) : (
          <XCircle size={21} />
        )}
      </div>

      <p className="flex-1 text-sm font-medium text-[var(--color-text)]">
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;